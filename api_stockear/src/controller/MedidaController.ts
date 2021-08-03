import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Medida } from "../entity/Medida";
import { Producto } from "../entity/Producto";
export class MedidaController {

    static getAll = async (req: Request, res: Response) => {
        const { userId, adminId } = res.locals.jwtPayload;
        const medidaRepo = getRepository(Medida);

        let id;
        if (adminId != 0) {
            id = adminId;
        } else {
            id = userId;
        }

        let medida;
        try {
            medida = await medidaRepo.find({
                where: { user: id }
            });
        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: 'Algo anda mal' });
        }

        if (medida.length > 0) {
            return res.send(medida);
        } else {
            return res.status(404).json({ message: 'No hubo resultado' });
        }
    }

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { userId } = res.locals.jwtPayload;

        const medidaRepo = getRepository(Medida);
        let medida;
        try {
            medida = await medidaRepo.findOneOrFail(id, {
                select: ['id', 'descripcion'],
                where: { user: userId }
            });
            return res.send(medida);
        } catch (e) {
            console.log('e: ', e);
            return res.status(404).json({ message: 'No hubo resultado' });
        }
    };

    static newMedida = async (req: Request, res: Response) => {
        const { descripcion } = req.body;
        const { userId } = res.locals.jwtPayload;

        const medida = new Medida();
        medida.descripcion = descripcion;
        medida.user = userId;

        const opcionesValidacion = { validationError: { target: false, value: false } };
        const errors = await validate(medida, opcionesValidacion);
        if (errors.length > 0) {
            return res.status(404).json({ message: "existen algunos errores, vea la consola", errors });
        }

        const medidaRepo = getRepository(Medida);
        try {
            await medidaRepo.save(medida);
        } catch (e) {
            console.log(e);
            return res.status(404).json({ message: 'algo salio mal' });
        }
        return res.status(201).json({ message: 'Medida Agregada' });
    }
    static editMedida = async (req: Request, res: Response) => {
        let medida;
        const { id } = req.params;
        const { descripcion } = req.body;
        const { userId } = res.locals.jwtPayload;

        const medidaRepo = getRepository(Medida);
        try {
            medida = await medidaRepo.findOneOrFail(id, {
                where: { user: userId }
            });
            medida.descripcion = descripcion;
        } catch (e) {
            return res.status(404).json({ message: 'Medida no encontrada' });
        }

        const opcionesValidacion = { validationError: { target: false, value: false } };
        const errors = await validate(medida, opcionesValidacion);
        if (errors.length > 0) {
            return res.status(400).json({ message: "existen algunos errores, vea la consola", errors });
        }

        try {
            await medidaRepo.save(medida);
        }
        catch (e) {
            return res.status(409).json({ message: 'El nombre de la medida ya esta en uso' })
        }
        return res.status(201).json({ message: 'Medida editada' });
    }

    static deleteMedida = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { userId } = res.locals.jwtPayload;

        const medidaRepo = getRepository(Medida);
        try {
            await medidaRepo.findOneOrFail(id, {
                where: { user: userId }
            });
        }
        catch (err) {
            console.log(err);
            return res.status(404).json({ message: 'Medida no encontrada' });
        }

        const prodRepo = getRepository(Producto);
        try {
            await prodRepo
                .createQueryBuilder()
                .update(Producto)
                .set({ medida: null })
                .where("medida=:id", { id: id })
                .andWhere("user=user", { user: userId })
                .execute();
        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "no se pudieron actualizar los productos" });
        }

        //eliminando medida
        try {
            await medidaRepo.delete(id);
        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "no se pudo eliminar la medida" });
        }

        return res.status(201).json({ message: 'Medida eliminada' });
    }
}
export default MedidaController;