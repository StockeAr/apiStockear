import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../entity/User';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { validate } from 'class-validator';
import { checkJwt } from '../middleware/jwt';
import { transporter } from '../config/mailer';

class AuthController {
    static login = async (req: Request, res: Response) => {
        //req es lo que nos enviara el front-end
        const { username, password } = req.body;
        if (!(username && password)) {
            return res.status(404).json({ message: 'Usuario y Contraseña son requeridos',status:404 });
        }
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({ where: { username:username.toLowerCase() } });
        }
        catch (e) {
            return res.status(409).json({ message: 'Usuario / Contraseña son incorrectos',status:409 });
        }

        //verificando la contraseña
        if (!user.checkPassword(password)) {
            return res.status(404).json({ message: 'Usuario / Contraseña son incorrectos', status:404});
        }
        const token = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecret, { expiresIn: '2h' });
        const refreshToken = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecretRefresh, { expiresIn: '2h' });

        const role = user.rol;
        const userId = user.id;
        const adminId = user.adminId;
        const nombre = user.nombre;
        const apellido = user.apellido;

        user.refreshToken = refreshToken;
        try {
            await userRepository.save(user);
        } catch (error) {
            return res.status(404).json({ message: 'algo anda mal', status:404});
        }
        res.json({ message: 'Ok', token, refreshToken, role, userId, adminId, nombre, apellido });

    };

    static changePassword = async (req: Request, res: Response) => {
        const { userId } = res.locals.jwtPayload;
        const { oldPassword, newPassword } = req.body;
        if (!(oldPassword && newPassword)) {
            res.status(400).json({ message: 'La contraseña nueva / anterior son requeridas' });
        }
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(userId);
        }
        catch (e) {
            res.status(400).json({ message: 'Algo anda mal >:V ' })
        }
        if (!user.checkPassword(oldPassword)) {
            return res.status(401).json({ message: 'Verifique su contraseña anterior' });
        }
        user.password = newPassword;
        const opcionesValidacion = { validationError: { target: false, value: false } };
        const errors = await validate(user, opcionesValidacion);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }
        //has de la contraseña
        user.hashPassword();
        userRepository.save(user);
        res.json({ message: 'Se ha cambiado la contraseña' });
    };

    static newAdmin = async (req: Request, res: Response) => {
        const { username, password, nombre, apellido, confirmPassword } = req.body;
        const user = new User();
        const fecha = new Date();
        user.username = username.toLowerCase();
        user.password = password;
        user.rol = 'admin';
        user.resetToken = 'vacio';
        user.refreshToken = 'vacio';
        user.creado = fecha;
        user.modificado = fecha;
        user.adminId = 0;
        user.nombre = nombre;
        user.apellido = apellido;

        //validaciones
        const opcionesValidacion = { validationError: { target: false, value: false } };
        const errors = await validate(user, opcionesValidacion);
        if (errors.length > 0) {
            return res.status(404).json({message:errors});
        }

        if (password != confirmPassword) {
            return res.status(409).json({ message: 'Las contraseñas no coinciden' });
        }

        const userRepository = getRepository(User);

        //console.log('esto guardo: ',user);
        //aqui vamos a realizar el hash para mas seguridad en las contraseñas
        try {
            user.hashPassword();
            await userRepository.save(user);
        }
        catch (e) {
            console.log(e);
            return res.status(409).json({ message: 'Este usuario ya esta registrado' });
        }
        //si todo esta bien mando un mensaje al front
        res.status(201).json({ message: 'Registro exitoso' });
    };

    static forgotPassword = async (req: Request, res: Response) => {
        const { username } = req.body;
        if (!(username)) {
            return res.status(404).json({ message: "El nombre de usuario es necesario" });
        }
        const message = 'Se envio un link a su correo para reestablecer su contraseña.';
        let verificationLink;
        let emailStatus = 'Ok';

        const userRepo = getRepository(User);
        let user: User;
        try {
            user = await userRepo.findOneOrFail({ where: { username } });
            const token = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecretReset, { expiresIn: '10m' });
            verificationLink = `http://localhost:3000/new-password/${token}`;
            //verificationLink = `http://apistockear.herokuapp.com/new-password/${token}`;
            user.resetToken = token;
        } catch (e) {
            return res.json({ message });
        }

        //para hacer: luego del envio de mail, 

        try {
            //envio de email
            await transporter.sendMail({
                from: '"StockeAr ✔" <proyecto.pp3@gmail.com>', // sender address
                to: user.username, // list of receivers
                subject: "Recuperar contraseña 🤦‍♂️", // Subject line
                //text: "Hello world?", // plain text body
                html: `
                    <b>Por favor haga click en el siguiente link o copie en su navegador para completar el proceso</b>
                    <a href="${verificationLink}">${verificationLink}</a>
                `, // html body
            });

        } catch (error) {
            emailStatus = error;
            return res.status(400).json({ message: 'algo anda mal :V' });
        }

        try {
            await userRepo.save(user);
        } catch (error) {
            emailStatus = error;
            return res.status(400).json({ message: 'Algo anda mal :V' });
        }

        res.json({ message, info: emailStatus, test: verificationLink });
    };

    static createNewPassword = async (req: Request, res: Response) => {
        const { newPassword } = req.body;
        const resetToken = req.headers['reset'] as string;
        if (!(resetToken && newPassword)) {
            res.status(400).json({ message: 'Todos los campos son requeridos' });
        }
        const userRepo = getRepository(User);
        let user: User;
        let jwtPayload;
        try {
            jwtPayload = jwt.verify(resetToken, config.jwtSecretReset);
            user = await userRepo.findOneOrFail({ where: { resetToken } });
        } catch (error) {
            return res.status(401).json({ message: 'algo anda mal' });
        }

        user.password = newPassword;

        const validationOps = { validationError: { tarjet: false, value: false } };
        const errors = await validate(user, validationOps);

        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        try {
            user.hashPassword();
            await userRepo.save(user);
        } catch (error) {
            return res.status(401).json({ message: 'algo anda mal' });
        }

        res.json({ message: 'Contraseña cambiada' });
    }

    static refreshToken = async (req: Request, res: Response) => {
        const refreshToken = req.headers['refresh'] as string;
        if (!(refreshToken)) {
            res.status(400).json({ message: 'algo nada mal :V' });
        }

        const userRepo = getRepository(User);
        let user: User;
        try {
            const verifyResult = jwt.verify(refreshToken, config.jwtSecretRefresh);
            const { username } = verifyResult as User;
            user = await userRepo.findOneOrFail({ where: { username } });
        } catch (error) {
            return res.status(400).json({ message: 'algo anda mal :V x2' });
        }

        const token = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecret, { expiresIn: '120' });

        res.json({ message: 'Ok', token });
    }
}
export default AuthController;