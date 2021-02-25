import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Recargo } from "../entity/Recargo";

export class RecargoController {

    static getAll = async (req: Request, res: Response) => {
        const { userId } = res.locals.jwtPayload;
        const recargoRepo = getRepository(Recargo);
        let recargo;
        try {
            recargo = await recargoRepo.find({
                where: { user: userId }
            });
        } catch (e) {
            res.status(404).json({ message: 'Algo anda mal' });
        }

        if (recargo.length > 0) {
            res.send(recargo);
        } else {
            res.status(404).json({ message: 'No hubo resultado' });
        }
    }

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { userId } = res.locals.jwtPayload;

        const recargoRepo = getRepository(Recargo);
        let recargo;
        try {
            recargo = await recargoRepo.findOneOrFail(id, {
                select: ['id', 'descripcion', 'monto', 'tipo'],
                where: { user: userId }
            });
            res.send(recargo);
        } catch (error) {
            res.status(404).json({ message: 'No hubo resultado' });
        }
    };

    static newRecargo = async (req: Request, res: Response) => {
        const { descripcion,monto,tipo } = req.body;
        const { userId } = res.locals.jwtPayload;

        const recargo = new Recargo();
        recargo.descripcion = descripcion;
        recargo.user = userId;
        recargo.monto=monto;
        recargo.tipo=tipo;

        const opcionesValidacion = { validationError: { target: false, value: false } };
        const errors = await validate(recargo, opcionesValidacion);
        if (errors.length > 0) {
            return res.status(404).json(errors);
        }

        const recargoRepo = getRepository(Recargo);
        try {
            await recargoRepo.save(recargo);
        } catch (e) {
            console.log(e);
            return res.status(404).json({ message: 'algo salio mal' });
        }
        res.status(201).json({ message: 'recargo Agregado' });
    }
    static editRecargo = async (req: Request, res: Response) => {
        let recargo;
        const { id } = req.params;
        const { descripcion,monto,tipo } = req.body;
        const { userId } = res.locals.jwtPayload;

        const recargoRepo = getRepository(Recargo);
        try {
            recargo = await recargoRepo.findOneOrFail(id, {
                where: { user: userId }
            });
            recargo.descripcion = descripcion;
            recargo.monto=monto;
            recargo.tipo=tipo;
        } catch (e) {
            return res.status(404).json({ message: 'categoria no encontrada' });
        }

        const opcionesValidacion = { validationError: { target: false, value: false } };
        const errors = await validate(recargo, opcionesValidacion);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        try {
            await recargoRepo.save(recargo);
        }
        catch (e) {
            return res.status(409).json({ message: 'El nombre del recargo ya esta en uso' })
        }
        res.status(201).json({ message: 'recargo editado' });
    }

    static deleteRecargo = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { adminId } = res.locals.jwtPayload;

        const recargoRepo = getRepository(Recargo);
        let recargo;
        try {
            recargo = await recargoRepo.find({
                where: { user: adminId, id: id }
            });
        }
        catch (err) {
            console.log(err);
            return res.status(404).json({ message: 'recargo no encontrado' });
        }

        //eliminando categoria para
        recargoRepo.delete(id);
        res.status(201).json({ message: 'recargo eliminado' });
    }
}