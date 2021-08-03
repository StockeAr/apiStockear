import { Router } from "express";
import { ProductoController } from '../controller/ProductoController'
import { checkJwt } from "../middleware/jwt";
import { chekRol } from "../middleware/rol";

const router = Router();
//obtener todos los productos
router.get('/list', [checkJwt], ProductoController.getAll);
//obtener los productos activos
router.get('/list-active', [checkJwt], ProductoController.getAllActive);
//obtener un producto
router.get('/find/:id', [checkJwt, chekRol(['admin'])], ProductoController.getById);
//crear nuevo producto
router.post('/new', [checkJwt, chekRol(['admin'])], ProductoController.newProducto);
//editar un producto
router.patch('/edit/:id', [checkJwt, chekRol(['admin'])], ProductoController.editProducto);
//eliminar un producto
router.delete('/delete/:id', [checkJwt, chekRol(['admin'])], ProductoController.deleteProducto);

export default router;