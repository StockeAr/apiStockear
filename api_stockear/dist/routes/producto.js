"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ProductoController_1 = require("../controller/ProductoController");
var jwt_1 = require("../middleware/jwt");
var rol_1 = require("../middleware/rol");
var router = express_1.Router();
//obtener todos los productos
router.get('/list', [jwt_1.checkJwt], ProductoController_1.ProductoController.getAll);
//obtener los productos activos
router.get('/list-active', [jwt_1.checkJwt], ProductoController_1.ProductoController.getAllActive);
//obtener un producto
router.get('/find/:id', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], ProductoController_1.ProductoController.getById);
//crear nuevo producto
router.post('/new', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], ProductoController_1.ProductoController.newProducto);
//editar un producto
router.patch('/edit/:id', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], ProductoController_1.ProductoController.editProducto);
//eliminar un producto
router.delete('/delete/:id', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], ProductoController_1.ProductoController.deleteProducto);
exports.default = router;
//# sourceMappingURL=producto.js.map