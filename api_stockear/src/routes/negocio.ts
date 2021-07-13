import { Router } from "express";
import { NegocioController } from "../controller/NegocioController";
import { checkJwt } from "../middleware/jwt";
import { chekRol } from "../middleware/rol";


const router = Router();

//datos del negocio
router.get('/find', [checkJwt, chekRol(['admin'])], NegocioController.getData)
//crear negocio;
router.post('/new', NegocioController.new);
//editar info del negocio
router.patch('/edit', [checkJwt, chekRol(['admin'])], NegocioController.edit);

export default router;