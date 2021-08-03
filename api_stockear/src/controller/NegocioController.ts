import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Negocio } from "../entity/Negocio";
import { User } from "../entity/User";


export class NegocioController {

    static getData = async (req: Request, res: Response) => {
        const { negocioId } = res.locals.jwtPayload;
        let negocio;
        const negocioRepo = getRepository(Negocio);
        try {
            negocio = await negocioRepo.findOneOrFail(negocioId,{
                select:['correo','descripcion','direccion','imagen','nombre','telefono']
            });
        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "no se encontro el negocio" });
        }

        return res.status(200).json(negocio);
    }

    static new = async (req: Request, res: Response) => {
        const { img, name, descripcion, direccion, telefono, userId } = req.body;

        const userRepo = getRepository(User);
        let user: User;
        try {
            user = await userRepo.findOneOrFail(userId, { where: { negocio: null } });
        } catch (e) {
            console.log('e: ', e);
            return res.status(400).json({ message: "algo anda mal 1" });
        }

        const negocio = new Negocio();
        negocio.imagen = img;
        negocio.nombre = name;
        negocio.descripcion = descripcion;
        negocio.direccion = direccion;
        negocio.telefono = telefono;

        const opcionesValidacion = { validationError: { target: false, value: false } };
        const errors = await validate(negocio, opcionesValidacion);
        if (errors.length > 0) {
            return res.status(404).json({ message: "existen algunos errores, vea la consola", errors });
        }

        const negocioRepo = getRepository(Negocio);
        let aux;
        try {
            aux = await negocioRepo.save(negocio);
        } catch (e) {
            console.log('e: ', e);
            return res.status(400).json({ message: "algo anda mal" });
        }

        //relaciono usuario con negocio
        try {
            user.negocio = aux.id;
            await userRepo.save(user);
        } catch (e) {
            return res.status(400).json({ message: "algo anda mal, contactese con soporte" });
        }
        return res.status(200).json({ message: 'negocio creado con exito, inicie session nuevamente' });
    }

    static edit = async (req: Request, res: Response) => {
        const { negocioId } = res.locals.jwtPayload;
        const { img, descripcion, name, direccion, telefono } = req.body;

        let negocio: Negocio;
        const negocioRepo = getRepository(Negocio);
        try {
            negocio = await negocioRepo.findOneOrFail(negocioId);
        } catch (e) {
            console.log('e: ', e);
            return res.status(404).json({ message: "no se encontro el negocio" });
        }

        negocio.imagen = img;
        negocio.nombre = name;
        negocio.descripcion = descripcion;
        negocio.direccion = direccion;
        negocio.telefono = telefono;

        const opcionesValidacion = { validationError: { target: false, value: false } };
        const errors = await validate(negocio, opcionesValidacion);

        if (errors.length > 0) {
            return res.status(400).json({ message: "existen algunos errores, vea la consola", errors });
        }
        try {
            await negocioRepo.save(negocio);
        } catch (e) {
            console.log("e: ", e);
            return res.status(400).json({ message: "algo anda mal" });
        }

        return res.status(200).json({ message: "negocio editado con exito" });
    }
}
export default NegocioController;