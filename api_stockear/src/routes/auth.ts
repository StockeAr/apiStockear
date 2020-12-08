import { Router } from 'express';
import AuthController from '../controller/AuthController';
import { checkJwt } from '../middleware/jwt';

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
router.post('/change-password', [checkJwt], AuthController.changePassword)
export default router;