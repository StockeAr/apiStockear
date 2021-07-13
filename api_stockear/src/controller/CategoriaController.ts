import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Categoria } from "../entity/Categoria";

export class CategoriaController {

    static getAll = async (req: Request, res: Response) => {
        const { userId, adminId } = res.locals.jwtPayload;
        let id;
        if (adminId != 0) {
            id = adminId;
        } else {
            id = userId;
        }
        const categoriaRepo = getRepository(Categoria);
        let categoria;
        try {
            categoria = await categoriaRepo.find({
                select: ['id', 'descripcion'],
                where: { user: id }
            });
        } catch (e) {
            return res.status(404).json({ message: 'Algo anda mal' });
        }

        if (categoria.length > 0) {
            return res.send(categoria);
        } else {
            return res.status(404).json({ message: 'No hubo resultado' });
        }
    }

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { userId } = res.locals.jwtPayload;

        const categoriaRepo = getRepository(Categoria);
        let categoria;
        try {
            categoria = await categoriaRepo.findOneOrFail(id, {
                select: ['id', 'descripcion'],
                where: { user: userId }
            });
            return res.send(categoria);
        } catch (error) {
            return res.status(404).json({ message: 'No hubo resultado' });
        }
    };

    static newCategoria = async (req: Request, res: Response) => {
        const { descripcion } = req.body;
        const { userId } = res.locals.jwtPayload;

        const categoria = new Categoria();
        categoria.descripcion = descripcion;
        categoria.user = userId;


        const opcionesValidacion = { validationError: { target: false, value: false } };
        const errors = await validate(categoria, opcionesValidacion);
        if (errors.length > 0) {
            return res.status(404).json({ message: "existen algunos errores, vea la consola", errors });
        }

        const categoriaRepo = getRepository(Categoria);
        try {
            await categoriaRepo.save(categoria);
        } catch (e) {
            console.log(e);
            return res.status(404).json({ message: 'algo salio mal' });
        }
        return res.status(201).json({ message: 'categoria Agregada' });
    }
    static editCategoria = async (req: Request, res: Response) => {
        let categoria;
        const { id } = req.params;
        const { descripcion } = req.body;
        const { userId } = res.locals.jwtPayload;

        const categoriaRepo = getRepository(Categoria);
        if (descripcion.length <= 0) {
            return res.status(404).json({ message: 'debe proporcionar un valor' });
        }

        try {
            categoria = await categoriaRepo.findOneOrFail(id, {
                where: { user: userId }
            });
            categoria.descripcion = descripcion;
        } catch (e) {
            return res.status(404).json({ message: 'categoria no encontrada' });
        }

        const opcionesValidacion = { validationError: { target: false, value: false } };
        const errors = await validate(categoria, opcionesValidacion);

        if (errors.length > 0) {
            return res.status(400).json({ message: "existen algunos errores, vea la consola", errors });
        }

        try {
            await categoriaRepo.save(categoria);
        }
        catch (e) {
            return res.status(409).json({ message: 'El nombre de la categoria ya esta en uso' })
        }
        return res.status(201).json({ message: 'categoria editada' });
    }

    static deleteCategoria = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { adminId } = res.locals.jwtPayload;

        const categoriaRepo = getRepository(Categoria);
        let categoria;
        try {
            categoria = await categoriaRepo.find({
                where: { user: adminId, id: id }
            });
        }
        catch (err) {
            console.log(err);
            return res.status(404).json({ message: 'categoria no encontrada' });
        }
        //eliminando categoria para
        categoriaRepo.delete(id);
        res.status(201).json({ message: 'categoria eliminada' });
    }
}