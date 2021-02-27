import { Request, Response } from "express";
import { getRepository, getManager } from "typeorm";
import { Producto } from "../entity/Producto";
import { User } from "../entity/User";
import { Venta } from "../entity/Venta";

export class VentaController {
    static getAll = async (req: Request, res: Response) => {
        //const { userId } = res.locals.jwtPayload;
        const ventaRepo = getRepository(Venta);

        const ventaManager = getManager()
        let venta;
        try {
            /* venta = await ventaRepo.find({
                where: { userId: userId },
                relations: ['producto']
            }) */

            venta = await ventaManager.query(
                `select venta.id,venta.productoId, venta.fechaVenta, user.username from venta inner join user on user.id=venta.userId`
            );
        } catch (e) {
            res.status(404).json({ message: 'Algo anda mal' });
        }

        if (venta.length > 0) {
            res.send(venta);
        } else {
            res.status(404).json({ message: 'No hubo resultado' });
        }
    };

    static getEmpleadosVentas = async (req: Request, res: Response) => {
        const { userId } = res.locals.jwtPayload;
        const ventaRepo = getRepository(Venta);
        const userRepo = getRepository(User);
        let empleados;
        let venta;
        let ventaEmpleado = [];
        let totalVenta = [];
        try {
            empleados = await userRepo.find({
                select: ['id'],
                where: { adminId: userId }
            });
            //console.log(JSON.stringify(empleados));
        } catch (e) {
            res.status(404).json({ message: 'Algo anda mal' });
        }
        try {
            for (let i = 0; i < empleados.length; i++) {
                venta = await ventaRepo.find({
                    //select:['precio','fechaVenta','producto','id'],
                    where: { userId: empleados[i].id },
                    relations: ['producto', 'user']
                });
                ventaEmpleado.push(await venta);
            }
            /* for(let i = 0; i < empleados.length;i++){
                venta = await ventaRepo.find({
                    where: { userId: empleados[i].id },
                    select:['precio']
                });
                totalVenta.push(await venta);
            } */

        } catch (e) {
            console.log(e);
            res.status(404).json({ message: 'Algo anda mal' });
        }
        //console.log(totalVenta)
        if (ventaEmpleado.length > 0) {

            //console.log(reporte);
            res.send(ventaEmpleado);
        } else {
            res.status(404).json({ message: 'No hubo resultado' });
        }
    };

    static newVenta = async (req: Request, res: Response) => {
        const { userId } = res.locals.jwtPayload;
        const { idProd, cantidad, adminId } = req.body;

        //compruebo si el tamaño de las cantidades es igual al tamaño de los id de productos
        if (idProd.length != cantidad.length) {
            return res.status(409).json({ message: 'La cantidad de productos no coincide con la cantidad a vender de cada uno' });
        }

        const prodRepo = getRepository(Producto);
        let infoProd = [];
        let auxMin;

        //busco las info de los productos que me solicitan distinguiendo si es admin o empleado
        if (parseInt(adminId) != 0) {
            try {

                for (let i = 0; i < idProd.length; i++) {
                    auxMin = await prodRepo.find({
                        select: ['id', 'minExistencia', 'cantidad', 'descripcion','costo'],
                        where: { user: adminId, id: idProd[i] }
                    });
                    if (auxMin.length > 0) {
                        infoProd.push(auxMin[0]);
                    }
                }

            } catch (e) {
                console.log('e1 ' + e);
                return res.status(404).json({ message: 'algo anda mal 1' });
            }
        } else {
            try {

                for (let i = 0; i < idProd.length; i++) {
                    auxMin = await prodRepo.find({
                        select: ['id', 'minExistencia', 'cantidad', 'descripcion','costo'],
                        where: { user: userId, id: idProd[i] }
                    });
                    if (auxMin.length > 0) {
                        infoProd.push(auxMin[0]);
                    }
                }

            } catch (e) {
                console.log('e2 ' + e);
                return res.status(404).json({ message: 'algo anda mal 2' });
            }
        }

        //compruebo si hubo resultado
        if (infoProd.length <= 0 || infoProd.length != idProd.length) {
            return res.status(404).json({ message: 'algo anda mal 3, compruebe los productos a vender' });
        }

        //compruebo si tengo disponible la cantidad que me solicitan y envio el primero que no concuerde
        for (let i = 0; i < infoProd.length; i++) {
            if (infoProd[i].cantidad < cantidad[i]) {
                return res.status(404).json({ message: 'cantidad de ' + infoProd[i].descripcion + ' insuficientes' });
            }
        }

        const myQuery = getManager();
        const ventaRepo = getRepository(Venta);
        const venta= new Venta();
        let idVentaProd=[];
        let aux;

        let total:number=0;
        let totalParcial;
        const fecha= new Date();

        try {
            //obtengo el total de la venta, aun no se aplican descuentos ni recargos
            for(let i=0;i<idProd.length;i++){
                total=total+(cantidad[i]*infoProd[i].costo);
            }

            try {
                //guardo los datos en la tabla venta
                venta.fechaVenta=fecha;
                venta.total=total;
                venta.user=userId;
                await ventaRepo.save(venta);

            } catch (e) {
                console.log('e3: '+e);
                return res.status(404).json({message:'no se pudo registrar la venta'});
            }

            /* obtengo el id de venta_producto, en teoria como recien agrege una venta, cuando busque el id maximo,
            va a asociarse a este la relacion venta_producto */
            idVentaProd = await myQuery.query(`select max(id) as m from venta`);
            idVentaProd = idVentaProd[0].m;
            //console.log(idVentaProd);

            //guardo en la relacion venta_producto; //tengo del body idProd[] y cantidad[]
            for (let i = 0; i <idProd.length; i++){
                aux=await myQuery.query(`insert into venta_producto
                    (productoId, ventaId, cantidad, totalParcial)
                    values (${idProd[i]}, ${idVentaProd}, ${cantidad[i]}, ${infoProd[i].costo * cantidad[i]})
                `);
            }

        } catch (e) {
            console.log('e: '+e);
            return res.status(404).json({ message: 'algo anda mal 4' });
        }

        res.status(200).json({ message: 'se registro la venta con exito !!!' });
    }
}
export default VentaController;