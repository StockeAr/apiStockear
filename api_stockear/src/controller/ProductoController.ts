import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Producto } from "../entity/Producto";

export class ProductoController{
    static getAll=async(req:Request,res:Response)=>{
        const {userId} =res.locals.jwtPayload;
        const productoRepo=getRepository(Producto);
        let producto;
        try {
            producto=await productoRepo.find({
                select:['id','descripcion','costo','cantidad','minExistencia'],
                where:{user:userId},
                relations:['categoria','medida']
            })
        } catch (e) {
            console.log(e);
            res.status(404).json({message: 'Algo anda mal :V' })
        }

        //aqui comprobamos si existe algun producto
        if (producto.length > 0) {
            res.send(producto);
        } else {
            res.status(404).json({ message: 'No Hubo resultado' });
        }
    };

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const {userId} = res.locals.jwtPayload;

        const productoRepo = getRepository(Producto);
        let producto;
        try {
            producto=await productoRepo.findOneOrFail(id,{
                select:['id','descripcion','costo','cantidad','minExistencia'],
                where:{user:userId},
                relations:['medida','categoria']
            });
            res.send(producto);
        } catch (e) {
            console.log(e);
            res.status(404).json({ message: 'No hubo resultado' })
        }
    };

    static newProducto= async (req: Request, res: Response) => {
        const {descripcion,costo, cantidad, minExistencia, medidaId, categoriaId}=req.body;
        const {userId}=res.locals.jwtPayload;
        //falta asociar a medida,categoria

        const producto=new Producto();
        const fecha=new Date();

        producto.descripcion=descripcion;
        producto.costo=costo;
        producto.cantidad=cantidad;
        producto.minExistencia=minExistencia;
        producto.creado=fecha;
        producto.modificado=fecha;
        producto.user=userId;

        //producto.medida=medidaId;
        producto.categoria=categoriaId;

        //validaciones
        const opcionesValidacion = { validationError: { target: false, value: false } };
        const errors = await validate(producto, opcionesValidacion);
        if (errors.length > 0) {
            return res.status(404).json(errors);
        }

        const productoRepo = getRepository(Producto);
        try {
            await productoRepo.save(producto);
        } catch (e) {
            console.log(e);
            return res.status(409).json({ message: 'El producto ya existe' })
        }

        res.status(201).json({ message:'producto creado'});
        
    ;}

    static editProducto= async (req: Request, res: Response) => {
        const {id} =req.params;
        const {descripcion,costo, cantidad, minExistencia, medidaId, categoriaId}=req.body;
        const {userId}=res.locals.jwtPayload;

        const fecha=new Date();
        const productoRepo = getRepository(Producto);
        let producto;

        try{
            producto=await productoRepo.findOneOrFail(id,{
                where:{user:userId}
            });
            console.log('encuentro: '+JSON.stringify(producto))
            producto.descripcion=descripcion;
            producto.costo=costo;
            producto.cantidad=cantidad;
            producto.minExistencia=minExistencia;
            producto.medida=medidaId;
            producto.categoria=categoriaId;
            producto.modificado = fecha;
        }catch (e) {
            return res.status(404).json({ message: 'Producto no encontrado'})
        }

        const opcionesValidacion = { validationError: { target: false, value: false } };
        const errors = await validate(producto, opcionesValidacion);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        try {
            console.log('guardo: '+JSON.stringify(producto));
            await productoRepo.save(producto);
        } catch (e) {
            return res.status(409).json({ message: 'El Producto ya existe'})
        }
        res.status(201).json({ message: 'Producto modificado'});
    };

    static deleteProducto=async (req: Request, res: Response)=>{
        const {id}=req.params;
        const {userId}=res.locals.jwtPayload;
        const productoRepo=getRepository(Producto);
        let producto;
        try {
            producto=await productoRepo.findOneOrFail({
                where:{id:id,user:userId}
            })
        } catch (e) {
            console.log(e);
            return res.status(404).json({ message: 'Producto no encontrado'});
        }

        //eliminando el producto
        productoRepo.delete(id);
        res.status(201).json({ message: 'Producto eliminado'});
    }
}