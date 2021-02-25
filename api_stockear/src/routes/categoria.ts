import { Router } from "express";
import {CategoriaController} from '../controller/CategoriaController'
import { checkJwt } from "../middleware/jwt";
import { chekRol } from "../middleware/rol";

const router=Router();
//obtener todas las medidas
router.get('/',[checkJwt, chekRol(['admin'])],CategoriaController.getAll);
//obtener una medida
router.get('/:id', [checkJwt, chekRol(['admin'])],CategoriaController.getById);
//crear nueva medida
router.post('/',[checkJwt, chekRol(['admin'])],CategoriaController.newCategoria);
//editar una medida
router.patch('/:id',[checkJwt, chekRol(['admin'])],CategoriaController.editCategoria);
//eliminar una medida
router.delete('/:id',[checkJwt, chekRol(['admin'])],CategoriaController.deleteCategoria);

export default router;