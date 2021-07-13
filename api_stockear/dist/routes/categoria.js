"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var CategoriaController_1 = require("../controller/CategoriaController");
var jwt_1 = require("../middleware/jwt");
var rol_1 = require("../middleware/rol");
var router = express_1.Router();
//obtener todas las medidas
router.get('/', [jwt_1.checkJwt], CategoriaController_1.CategoriaController.getAll);
//obtener una medida
router.get('/:id', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], CategoriaController_1.CategoriaController.getById);
//crear nueva medida
router.post('/', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], CategoriaController_1.CategoriaController.newCategoria);
//editar una medida
router.patch('/:id', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], CategoriaController_1.CategoriaController.editCategoria);
//eliminar una medida
router.delete('/:id', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], CategoriaController_1.CategoriaController.deleteCategoria);
exports.default = router;
//# sourceMappingURL=categoria.js.map