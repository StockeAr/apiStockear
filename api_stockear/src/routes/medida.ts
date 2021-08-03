import { Router } from "express";
import { MedidaController } from '../controller/MedidaController'
import { checkJwt } from "../middleware/jwt";
import { chekRol } from "../middleware/rol";

const router = Router();
//obtener todas las medidas
router.get('/', [checkJwt], MedidaController.getAll);
//obtener una medida
router.get('/:id', [checkJwt, chekRol(['admin'])], MedidaController.getById);
//crear nueva medida
router.post('/', [checkJwt, chekRol(['admin'])], MedidaController.newMedida);
//editar una medida
router.patch('/:id', [checkJwt, chekRol(['admin'])], MedidaController.editMedida);
//eliminar una medida
router.delete('/:id', [checkJwt, chekRol(['admin'])], MedidaController.deleteMedida);

export default router;