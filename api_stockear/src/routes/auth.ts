import { Router } from 'express';
import AuthController from '../controller/AuthController';
import { checkJwt } from '../middleware/jwt';
import { chekRol } from '../middleware/rol';

const router = Router();
//login
router.post('/login', AuthController.login);

//olvido su contraseña
router.put('/forgot-password', AuthController.forgotPassword);

//crear una nueva contraseña
router.put('/new-password', AuthController.createNewPassword);

//
router.post('/refresh-token', AuthController.refreshToken);

//cambiar la contraseña, para ademas restringir sola al admin, se debe importar el checkRol
router.post('/change-password', [checkJwt], AuthController.changePassword);

//registrarse
router.post('/register', AuthController.newAdmin);

//mis datos de admin
//router.get('/mi-perfil/:id', AuthController.myData);

//editar perfil de admin
router.patch('/edit', [checkJwt, chekRol(['admin'])], AuthController.editarPerfil);

export default router;