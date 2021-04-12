import { Router } from "express";
import {ProductoController} from '../controller/ProductoController'
import { checkJwt } from "../middleware/jwt";
import { chekRol } from "../middleware/rol";

const router=Router();
//obtener todos los productos
router.get('/',[checkJwt],ProductoController.getAll);
//obtener un producto
router.get('/:id', [checkJwt, chekRol(['admin'])],ProductoController.getById);
//crear nuevo producto
router.post('/',[checkJwt, chekRol(['admin'])],ProductoController.newProducto);
//editar un producto
router.patch('/:id',[checkJwt, chekRol(['admin'])],ProductoController.editProducto);
//eliminar un producto
router.delete('/:id',[checkJwt, chekRol(['admin'])],ProductoController.deleteProducto);

export default router;