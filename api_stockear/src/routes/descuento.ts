import { Router } from "express";
import {DescuentoController} from '../controller/DescuentoController'
import { checkJwt } from "../middleware/jwt";
import { chekRol } from "../middleware/rol";

const router=Router();
//obtener todas las medidas
router.get('/',[checkJwt, chekRol(['admin'])],DescuentoController.getAll);
//obtener una medida
router.get('/:id', [checkJwt, chekRol(['admin'])],DescuentoController.getById);
//crear nueva medida
router.post('/',[checkJwt, chekRol(['admin'])],DescuentoController.newDescuento);
//editar una medida
router.patch('/:id',[checkJwt, chekRol(['admin'])],DescuentoController.editDescuento);
//eliminar una medida
router.delete('/:id',[checkJwt, chekRol(['admin'])],DescuentoController.deleteDescuento);

export default router;