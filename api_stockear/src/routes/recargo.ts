import { Router } from "express";
import {RecargoController} from '../controller/RecargoController'
import { checkJwt } from "../middleware/jwt";
import { chekRol } from "../middleware/rol";

const router=Router();
//obtener todas las medidas
router.get('/',[checkJwt, chekRol(['admin'])],RecargoController.getAll);
//obtener una medida
router.get('/:id', [checkJwt, chekRol(['admin'])],RecargoController.getById);
//crear nueva medida
router.post('/',[checkJwt, chekRol(['admin'])],RecargoController.newRecargo);
//editar una medida
router.patch('/:id',[checkJwt, chekRol(['admin'])],RecargoController.editRecargo);
//eliminar una medida
router.delete('/:id',[checkJwt, chekRol(['admin'])],RecargoController.deleteRecargo);

export default router;