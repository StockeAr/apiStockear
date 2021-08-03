import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Producto } from "../entity/Producto";
import { User } from "../entity/User";

export class ProductoController {
    static getAll = async (req: Request, res: Response) => {
        const { userId } = res.locals.jwtPayload;

        const userRepository = getRepository(User);
        let user;
        let id;
        try {
            user = await userRepository.findOneOrFail({
                select: ['adminId'],
                where: { id: userId }
            });
        } catch (e) {
            return res.status(404).json({ message: 'no se encontro usuario' });
        }
        //esto es para comprobar si es admin o emleado (en el ultimo caso identificar el id de su admin)
        if (user.adminId == 0) {
            id = userId;
        } else {
            id = user.adminId;
        }

        const productoRepo = getRepository(Producto);
        let producto;
        try {
            /* producto = await productoRepo.find({
                select: ['id', 'descripcion', 'costo', 'cantidad', 'minExistencia', 'imagen', 'medida'],
                where: { user: id },
                relations: ['categoria', 'medida']
            }) */
            producto = await productoRepo
                .createQueryBuilder("producto")
                .select([
                    "producto.id",
                    "producto.descripcion",
                    "producto.costo",
                    "producto.cantidad",
                    "producto.minExistencia",
                    "producto.imagen",
                    "producto.activo",
                    "categoria.descripcion",
                    "categoria.id",
                    "medida.descripcion",
                    "medida.id"
                ])
                .leftJoin("producto.categoria", "categoria")
                .leftJoin("producto.medida", "medida")
                .where("producto.user=:id", { id: id })
                .orderBy("producto.modificado", "DESC")
                .getMany();
        } catch (e) {
            console.log(e);
            return res.status(404).json({ message: 'Algo anda mal :V' })
        }
        //console.log(producto)
        //aqui comprobamos si existe algun producto
        if (producto.length > 0) {
            return res.send(producto);
        } else {
            return res.status(404).json({ message: 'No Hubo resultado' });
        }
    };

    static getAllActive = async (req: Request, res: Response) => {
        const { adminId, userId } = res.locals.jwtPayload;
        let id: number;
        if (adminId == 0) {
            id = userId;
        } else {
            id = adminId;
        }

        const prodRepo = getRepository(Producto);
        let producto;
        try {
            producto = await prodRepo
                .createQueryBuilder("producto")
                .select([
                    "producto.id",
                    "producto.descripcion",
                    "producto.costo",
                    "producto.cantidad",
                    "producto.minExistencia",
                    "producto.imagen",
                    "producto.activo",
                    "categoria.descripcion",
                    "categoria.id",
                    "medida.descripcion",
                    "medida.id"
                ])
                .leftJoin("producto.categoria", "categoria")
                .leftJoin("producto.medida", "medida")
                .where("producto.user=:id", { id: id })
                .andWhere("producto.activo=:state", { state: true })
                .orderBy("producto.modificado", "DESC")
                .getMany();
        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "Algo nada mal" });
        }

        if (producto.length > 0) {
            return res.send(producto);
        } else {
            return res.status(404).json({ message: "no hubo resultado" });
        }
    }

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { userId } = res.locals.jwtPayload;

        const productoRepo = getRepository(Producto);
        let producto;
        try {
            producto = await productoRepo.findOneOrFail(id, {
                select: ['id', 'descripcion', 'costo', 'cantidad', 'minExistencia', 'medida', 'imagen'],
                where: { user: userId },
                relations: ['categoria', 'medida']
            });
        } catch (e) {
            console.log(e);
            return res.status(404).json({ message: 'No hubo resultado' })
        }
        return res.send(producto);
    };

    static newProducto = async (req: Request, res: Response) => {
        const { descripcion, costo, cantidad, minExistencia, categoriaId, medidaId, imagen } = req.body;
        const { userId } = res.locals.jwtPayload;

        const producto = new Producto();
        const fecha = new Date();

        producto.descripcion = descripcion;
        producto.costo = parseFloat(costo);
        producto.creado = fecha;
        producto.modificado = fecha;
        producto.user = userId;
        producto.activo = true;

        if (medidaId && medidaId != "") {
            producto.medida = medidaId;
            producto.cantidad = parseFloat(cantidad);
            producto.minExistencia = parseFloat(minExistencia);
        } else {
            producto.medida = null;
            producto.cantidad = Math.trunc(parseFloat(cantidad));
            producto.minExistencia = Math.trunc(parseFloat(minExistencia));
        }

        if (imagen && imagen != "") {
            producto.imagen = imagen;
        } else {
            producto.imagen = null;
        }

        if (categoriaId && categoriaId != "") {
            producto.categoria = categoriaId;
        } else {
            producto.categoria = null;
        }
        //validaciones
        const opcionesValidacion = { validationError: { target: false, value: false } };
        const errors = await validate(producto, opcionesValidacion);
        if (errors.length > 0) {
            return res.status(404).json({ message: "existen algunos errores, vea la consola", errors });
        }

        const productoRepo = getRepository(Producto);
        try {
            await productoRepo.save(producto);
        } catch (e) {
            console.log(e);
            return res.status(409).json({ message: 'El producto ya existe' })
        }

        return res.status(201).json({ message: 'producto creado' });
    }

    static editProducto = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { descripcion, costo, cantidad, minExistencia, imagen, medidaId, categoriaId, activo } = req.body;
        const { userId } = res.locals.jwtPayload;

        const fecha = new Date();
        const productoRepo = getRepository(Producto);
        let producto: Producto;

        try {
            producto = await productoRepo.findOneOrFail(id, {
                where: { user: userId }
            });
            //console.log('encuentro: ' + JSON.stringify(producto));
            producto.descripcion = descripcion;
            producto.costo = costo;
            if (activo.toLowerCase() === 'true') {
                producto.activo = true;
            } else {
                if (activo.toLowerCase() === 'false') {
                    producto.activo = false;
                }
            }
            if (medidaId) {
                producto.medida = medidaId;
                producto.cantidad = parseFloat(cantidad);
                producto.minExistencia = parseFloat(minExistencia);
            } else {
                producto.medida = null;
                producto.cantidad = Math.trunc(parseFloat(cantidad));
                producto.minExistencia = Math.trunc(parseFloat(minExistencia));
            }
            if (imagen === "") {
                producto.imagen = null
            } else {
                producto.imagen = imagen;
            }
            producto.categoria = categoriaId;
            producto.modificado = fecha;

        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: 'Producto no encontrado' })
        }

        const opcionesValidacion = { validationError: { target: false, value: false } };
        const errors = await validate(producto, opcionesValidacion);
        if (errors.length > 0) {
            return res.status(400).json({ message: "existen algunos errores, vea la consola", errors });
        }

        try {
            await productoRepo.save(producto);
        } catch (e) {
            console.log("e: ", e);
            return res.status(409).json({ message: 'El Producto ya existe o no se pudo actualizar' });
        }
        return res.status(201).json({ message: 'Producto modificado' });
    };

    static deleteProducto = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { userId } = res.locals.jwtPayload;
        const productoRepo = getRepository(Producto);
        let producto;
        try {
            producto = await productoRepo.findOneOrFail({
                where: { id: id, user: userId }
            })
        } catch (e) {
            console.log(e);
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        //eliminando el producto
        try {
            await productoRepo.delete(id);
        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "no se pudo borrar el producto, pruebe a desactivarlo" });
        }
        return res.status(201).json({ message: 'Producto eliminado' });
    }
}
export default ProductoController;