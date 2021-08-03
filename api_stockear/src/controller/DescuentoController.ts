import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Descuento } from "../entity/Descuento";

export class DescuentoController {

    static getAll = async (req: Request, res: Response) => {
        const { userId } = res.locals.jwtPayload;
        const descuentoRepo = getRepository(Descuento);
        let descuento;
        try {
            descuento = await descuentoRepo.find({
                where: { user: userId }
            });
        } catch (e) {
            return res.status(404).json({ message: 'Algo anda mal' });
        }

        if (descuento.length > 0) {
            return res.send(descuento);
        } else {
            return res.status(404).json({ message: 'No hubo resultado' });
        }
    }

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { userId } = res.locals.jwtPayload;

        const descuentoRepo = getRepository(Descuento);
        let descuento;
        try {
            descuento = await descuentoRepo.findOneOrFail(id, {
                select: ['id', 'descripcion', 'monto', 'tipo'],
                where: { user: userId }
            });
        } catch (error) {
            return res.status(404).json({ message: 'No hubo resultado' });
        }

        return res.send(descuento);
    };

    static newDescuento = async (req: Request, res: Response) => {
        const { descripcion, monto, tipo } = req.body;
        const { userId } = res.locals.jwtPayload;

        const descuento = new Descuento();
        descuento.descripcion = descripcion;
        descuento.user = userId;
        descuento.monto = monto;
        descuento.tipo = tipo;

        const opcionesValidacion = { validationError: { target: false, value: false } };
        const errors = await validate(descuento, opcionesValidacion);
        if (errors.length > 0) {
            return res.status(404).json(errors);
        }

        const descuentoRepo = getRepository(Descuento);
        try {
            await descuentoRepo.save(descuento);
        } catch (e) {
            console.log(e);
            return res.status(404).json({ message: 'algo salio mal' });
        }
        return res.status(201).json({ message: 'descuento Agregado' });
    }
    static editDescuento = async (req: Request, res: Response) => {
        let descuento;
        const { id } = req.params;
        const { descripcion, monto, tipo } = req.body;
        const { userId } = res.locals.jwtPayload;

        const descuentoRepo = getRepository(Descuento);
        try {
            descuento = await descuentoRepo.findOneOrFail(id, {
                where: { user: userId }
            });
            descuento.descripcion = descripcion;
            descuento.monto = monto;
            descuento.tipo = tipo;
        } catch (e) {
            return res.status(404).json({ message: 'categoria no encontrada' });
        }

        const opcionesValidacion = { validationError: { target: false, value: false } };
        const errors = await validate(descuento, opcionesValidacion);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        try {
            await descuentoRepo.save(descuento);
        }
        catch (e) {
            return res.status(409).json({ message: 'El nombre del descuento ya esta en uso' })
        }
        return res.status(201).json({ message: 'descuento editado' });
    }

    static deleteDescuento = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { adminId } = res.locals.jwtPayload;

        const descuentoRepo = getRepository(Descuento);
        let descuento;
        try {
            descuento = await descuentoRepo.find({
                where: { user: adminId, id: id }
            });
        }
        catch (err) {
            console.log(err);
            return res.status(404).json({ message: 'descuento no encontrado' });
        }

        //eliminando categoria para
        await descuentoRepo.delete(id);
        res.status(201).json({ message: 'descuento eliminado' });
    }
}
export default DescuentoController;