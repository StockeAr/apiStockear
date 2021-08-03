import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";
import { validate } from 'class-validator';

export class UserController {
    //Obtener todos los usuarios

    static getAll = async (req: Request, res: Response) => {
        const { userId } = res.locals.jwtPayload;
        const userRepository = getRepository(User);
        let users;
        try {
            users = await userRepository.find({
                select: ['id', 'username', 'nombre', 'apellido', 'rol', 'modificado','activo'],
                where: { adminId: userId }
            });
        }
        catch (e) {
            return res.status(404).json({ message: 'Algo anda mal :v' });
        }

        //aqui comprobamos si existe algun usuario
        if (users.length > 0) {
            return res.send(users);
        } else {
            return res.status(404).json({ message: 'No Hubo resultado' });
        }
    };
    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { userId } = res.locals.jwtPayload;

        const userRepository = getRepository(User);
        let user;
        try {
            user = await userRepository.findOneOrFail(id, {
                select: ['id', 'username', 'nombre', 'apellido', 'rol', 'creado', 'modificado'],
                where: { adminId: userId }
            });
            return res.send(user);
        }
        catch (e) {
            return res.status(404).json({ message: 'No hubo resultado' });
        }
    };
    static newUser = async (req: Request, res: Response) => {
        const { username, password, nombre, apellido } = req.body;
        const { userId, negocioId } = res.locals.jwtPayload;

        const user = new User();
        const fecha = new Date();

        user.username = username;
        user.password = password;
        user.rol = "empleado";
        user.creado = fecha;
        user.modificado = fecha;
        user.adminId = userId;
        user.nombre = nombre;
        user.apellido = apellido;
        user.negocio = negocioId;

        //validaciones
        const opcionesValidacion = { validationError: { target: false, value: false } };
        const errors = await validate(user, opcionesValidacion);
        if (errors.length > 0) {
            return res.status(404).json({ message: "existen algunos errores, vea la consola", errors });
        }
        //aqui vamos a realizar el hash para mas seguridad en las contraseñas

        const userRepository = getRepository(User);
        try {
            user.hashPassword();
            await userRepository.save(user);
        }
        catch (e) {
            console.log("e: ",e);
            return res.status(409).json({ message: 'El nombre de usuario existe' });
        }
        //si todo esta bien mando un mensaje al front
        return res.status(201).json({ message: 'usuario creado' });
        //res.send('usuario creado');
    };
    static editUser = async (req: Request, res: Response) => {
        let user: User;
        const { id } = req.params;
        const { username, nombre, apellido, password, activo } = req.body;
        const { userId } = res.locals.jwtPayload;

        const fecha = new Date();
        const userRepository = getRepository(User);
        try {
            user = await userRepository.findOneOrFail(id, {
                where: { adminId: userId }
            });
            user.username = username;
            user.nombre = nombre;
            user.apellido = apellido;
            user.modificado = fecha;
            user.password = password;
            if (activo.toLowerCase() === 'true') {
                user.activo = true;
            } else {
                if (activo.toLowerCase() === 'false') {
                    user.activo = false;
                }
            }
        }
        catch (e) {
            console.log("e: ",e);
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const opcionesValidacion = { validationError: { target: false, value: false } };
        const errors = await validate(user, opcionesValidacion);
        if (errors.length > 0) {
            return res.status(400).json({ message: "existen algunos errores, vea la consola", errors });
        }

        //si todo esta bien guardamos los datos
        try {
            user.hashPassword();
            await userRepository.save(user);
        }
        catch (e) {
            console.log("e: ",e);
            return res.status(409).json({ message: 'El usuario esta en uso' })
        }
        return res.status(201).json({ message: 'usuario se ha modificado' });
    };
    static deleteUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { userId } = res.locals.jwtPayload;
        const userRepository = getRepository(User);
        let user;
        try {
            user = await userRepository.find({
                where: { id: id, adminId: userId }
            });
        }
        catch (e) {
            console.log(e);
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }
        try {
            await userRepository.delete(id);
        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "no se pudo eliminar el usuario" });
        }
        //eliminando el usuario
        return res.status(201).json({ message: 'Usuario eliminado' });
    };
}
export default UserController;