import { Request, Response } from "express";
import { getRepository, getManager } from "typeorm";
import { Producto } from "../entity/Producto";
import { User } from "../entity/User";
import { Venta } from "../entity/Venta";
import { VentaProducto } from "../entity/VentaProducto";

export class VentaController {
    static getAll = async (req: Request, res: Response) => {
        const { userId } = res.locals.jwtPayload;
        const ventaRepo = getRepository(Venta);
        let venta;
        try {
            venta = await ventaRepo.find({
                select: ['total', 'fechaVenta', 'id'],
                where: { user: userId }
            });
        } catch (e) {
            return res.status(404).json({ message: 'Algo anda mal' });
        }

        if (venta.length > 0) {
            return res.send(venta);
        } else {
            return res.status(404).json({ message: 'No hubo resultado' });
        }
    };

    //realizar un pequeño refactor
    static getById = async (req: Request, res: Response) => {
        //const { userId } = res.locals.jwtPayload;
        const { id } = req.params;
        // const myQuery = getManager();
        const ventaProdRepo = getRepository(VentaProducto);
        let ventaInfo;
        try {
            /* ventaInfo = await myQuery.query(`select v_p.ventaId, p.descripcion as producto, c.descripcion as categoria,  p.costo, v_p.cantidad, v_p.totalParcial from venta_producto as v_p
            inner join producto as p
            on v_p.productoId=p.id
            inner join categoria as c
            on p.categoriaId=c.id
            where v_p.ventaId=${id}`); */

            ventaInfo = await ventaProdRepo
                .createQueryBuilder("venta_producto")
                .select([
                    "venta_producto.cantidad",
                    "venta_producto.precio",
                    "venta_producto.totalParcial",
                    "venta_producto.ventaId",
                    "producto.descripcion",
                    "medida.descripcion",
                    "categoria.descripcion"
                ])
                .leftJoin("venta_producto.producto", "producto")
                .leftJoin("producto.medida", "medida")
                .leftJoin("producto.categoria", "categoria")
                .where("venta_producto.venta=:id", { id: id })
                .getMany();

        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: 'algo anda mal' });
        }

        if (ventaInfo.length > 0) {
            return res.status(200).json(ventaInfo);
        } else {
            return res.status(404).json({ message: 'no hubo resultado' });
        }
    }

    static getEmpleadosVentas = async (req: Request, res: Response) => {
        const { userId } = res.locals.jwtPayload;
        const ventaRepo = getRepository(Venta);
        let venta;

        try {
            venta = await ventaRepo
                .createQueryBuilder("venta")
                .select([
                    "venta.fechaVenta",
                    "venta.total",
                    "venta.id",
                    "user.username",
                    "user.nombre",
                    "user.apellido",
                    "user.id",
                    "venta_producto.cantidad",
                    "venta_producto.totalParcial",
                    "venta_producto.precio",
                    "venta_producto.ventaId",
                    "producto.descripcion",
                    "medida.descripcion",
                    "categoria.descripcion",
                ])
                .leftJoin("venta.user", "user")
                .leftJoin("venta.ventaProducto", "venta_producto")
                .leftJoin("venta_producto.producto", "producto")
                .leftJoin("producto.medida", "medida")
                .leftJoin("producto.categoria", "categoria")
                .orderBy("venta.fechaVenta", "DESC")
                .where("user.adminId=:id", { id: userId })
                .getMany();
        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "algo salio mal" });
        }
        return res.json(venta);
    };

    static estadisticas = async (req: Request, res: Response) => {
        const { userId, negocioId } = res.locals.jwtPayload;
        const userRepo = getRepository(User);
        const prodRepo = getRepository(Producto);

        let user;
        try {
            user = await userRepo
                .createQueryBuilder("user")
                .select("CONCAT(user.nombre,' ',user.apellido)", "name")
                .addSelect("SUM(venta.total)", "value")
                .leftJoin("user.ventas", "venta")
                .where("user.negocio=:id", { id: negocioId })
                .groupBy("user.id")
                .getRawMany();
        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "algo anda mal" });
        }
        //console.log(venta);

        let prod;
        try {
            prod = await prodRepo
                .createQueryBuilder("producto")
                .select("COUNT(venta_producto.producto)","value")
                .addSelect("producto.descripcion","name")
                .leftJoin("producto.ventaProducto","venta_producto")
                .leftJoin("producto.user","user")
                .where("user.negocio=:id", { id: negocioId })
                .groupBy("producto.id")
                .getRawMany();
        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "algo anda mal" });
        }

        /* let producto;
        const ventaRepo = getRepository(Producto);
        try {
            producto = await ventaRepo
                .createQueryBuilder("producto")
                .select([
                    "venta.id",
                    "venta_producto.cantidad",
                    "producto.descripcion",
                    "user.id",
                    "user.nombre",
                    "user.apellido"
                ])
                .leftJoin("producto.ventaProducto", "venta_producto")
                .leftJoin("venta_producto.venta", "venta")
                .leftJoin("venta.user", "user")
                .where("user.adminId=:id", { id: userId })
                .getMany();
        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "algo salio mal" })
        } */
        //console.log(producto);


        //res.send({ producto, user, aux, venta })
        return res.status(200).json({ prod, user });
    }

    static newVenta = async (req: Request, res: Response) => {
        const { userId, adminId } = res.locals.jwtPayload;
        const { idProd, cantidad } = req.body;

        //compruebo si el tamaño de las cantidades es igual al tamaño de los id de productos
        if ((idProd.length == 0) || (cantidad.length == 0)) {
            return res.status(404).json({ message: 'no envio nada' });
        }

        if (idProd.length != cantidad.length) {
            return res.status(404).json({ message: 'La cantidad de productos no coincide con la cantidad a vender de cada uno' });
        }

        const prodRepo = getRepository(Producto);
        let infoProd = [];
        let id;

        if (adminId == 0) {
            id = userId;
        } else {
            id = adminId;
        }

        //obtengo informacion de los productos a vender
        try {
            for (let i = 0; i < idProd.length; i++) {
                let aux = null;
                aux = await prodRepo.findOneOrFail(idProd[i], {
                    select: ['id', 'minExistencia', 'cantidad', 'descripcion', 'costo'],
                    where: [{ user: id }],
                    relations: ['medida']
                });
                infoProd.push(aux);
            }

            if ((idProd.length != infoProd.length) && (infoProd.length <= 0)) {
                return res.status(404).json({ message: "envie nuevamente los productos a vender" });
            }
        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "algo anda mal 1" });
        }

        //compruebo si tengo disponible la cantidad que me solicitan y envio el primero que no concuerde
        for (let i = 0; i < infoProd.length; i++) {
            let aux = infoProd[i].cantidad - cantidad[i];
            if (aux < 0) {
                return res.status(404).json({ message: 'cantidad de ' + infoProd[i].descripcion + ' insuficientes', status: 404 });
            }
        }

        const ventaRepo = getRepository(Venta);
        let fecha = new Date();
        let insert = null;
        let total: number = 0;

        //calculo el total de la venta
        for (let i = 0; i < infoProd.length; i++) {
            if (infoProd[i].medida != null) {
                total += infoProd[i].costo * cantidad[i];
            } else {
                total += infoProd[i].costo * Math.trunc(cantidad[i]);
            }
        }

        //guardo la infromacion en la tabla venta
        try {
            insert = await ventaRepo
                .createQueryBuilder()
                .insert()
                .into(Venta)
                .values([{
                    total: total,
                    user: userId,
                    fechaVenta: fecha
                }])
                .execute();
        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "no se pudo realizar la venta 1" });
        }

        //guardo la informacion en la tabla ventaProducto
        const ventaProdRepo = getRepository(VentaProducto);
        try {
            for (let i = 0; i < infoProd.length; i++) {
                let aux = 0;
                if (infoProd[i].medida != null) {
                    aux = cantidad[i];
                } else {
                    aux = Math.trunc(cantidad[i]);
                }
                await ventaProdRepo
                    .createQueryBuilder()
                    .insert()
                    .into(VentaProducto)
                    .values([{
                        cantidad: aux,
                        precio: infoProd[i].costo,
                        totalParcial: (aux * infoProd[i].costo),
                        ventaId: insert.raw.insertId,
                        productoId: infoProd[i].id
                    }])
                    .execute();
                aux = 0;
            }
        } catch (e) {
            console.log("e: ", e);
            //elimino la venta creada previamente
            try {
                await ventaRepo
                    .createQueryBuilder()
                    .delete()
                    .from(Venta)
                    .where("id=:id", { id: insert.raw.insertId })
                    .execute();
            } catch (e) {
                console.log("e: ", e);
                return res.status(404).json({ message: "algo anda mal 2" });
            }
            return res.status(404).json({ message: "no se pudo realizar la venta 2" });
        }

        //actualizo las cantidades de los productos
        try {
            for (let i = 0; i < infoProd.length; i++) {
                let aux = 0;
                if (infoProd[i].medida != null) {
                    aux = cantidad[i];
                } else {
                    aux = Math.trunc(cantidad[i]);
                }
                await prodRepo
                    .createQueryBuilder()
                    .update(Producto)
                    .set({
                        cantidad: (infoProd[i].cantidad - aux)
                    })
                    .where("id=:id", { id: infoProd[i].id })
                    .andWhere("user=:user", { user: id })
                    .execute();
                aux = 0;
            }
        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "no se pudo actualizar los productos" });
        }

        //esto es viejo y funciona
        /* const myQuery = getManager();
        const ventaRepo = getRepository(Venta);
        const venta = new Venta();
        let idVentaProd = [];
        let aux;
        let total: number = 0;
        const fecha = new Date(); */

        /*  try {
             //obtengo el total de la venta, aun no se aplican descuentos ni recargos
             for (let i = 0; i < idProd.length; i++) {
                 total = total + (cantidad[i] * infoProd[i].costo);
             }
 
             try {
                 //guardo los datos en la tabla venta
                 venta.fechaVenta = fecha;
                 venta.total = total;
                 venta.user = userId;
                 await ventaRepo.save(venta);
 
             } catch (e) {
                 console.log('e3: ' + e);
                 return res.status(404).json({ message: 'no se pudo registrar la venta', status: 404 });
             }
 
             //obtengo el id de venta_producto, en teoria como recien agrege una venta, cuando busque el id maximo,
             //va a asociarse a este la relacion venta_producto
             idVentaProd = await myQuery.query(`select max(id) as m from venta`);
             idVentaProd = idVentaProd[0].m;
             //console.log(idVentaProd);
 
             //guardo en la relacion venta_producto; //tengo del body idProd[] y cantidad[]
             for (let i = 0; i < idProd.length; i++) {
                 aux = await myQuery.query(`insert into venta_producto
                     (productoId, ventaId, cantidad, totalParcial)
                     values (${idProd[i]}, ${idVentaProd}, ${cantidad[i]}, ${infoProd[i].costo * cantidad[i]})
                 `);
             }
 
             //realizo una actualizacion de las cantidades de los productos vendidos distinguiendo el rol
             if (parseInt(adminId) != 0) {
                 for (let i = 0; i < idProd.length; i++) {
                     aux = await myQuery.query(`update producto set 
                     producto.cantidad=${infoProd[i].cantidad - cantidad[i]}
                     where producto.id=${infoProd[i].id} and producto.userId=${adminId}
                     `)
                 }
             } else {
                 for (let i = 0; i < idProd.length; i++) {
                     aux = await myQuery.query(`update producto set 
                     producto.cantidad=${infoProd[i].cantidad - cantidad[i]}
                     where producto.id=${infoProd[i].id} and producto.userId=${userId}
                     `)
                 }
             }
 
         } catch (e) {
             console.log('e: ' + e);
             return res.status(404).json({ message: 'algo anda mal 4', status: 404 });
         } */

        return res.status(200).json({ message: 'se registro la venta con exito !!!', status: 200 });
    }
}
export default VentaController;