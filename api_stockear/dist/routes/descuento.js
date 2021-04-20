"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var DescuentoController_1 = require("../controller/DescuentoController");
var jwt_1 = require("../middleware/jwt");
var rol_1 = require("../middleware/rol");
var router = express_1.Router();
//obtener todas las medidas
router.get('/', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], DescuentoController_1.DescuentoController.getAll);
//obtener una medida
router.get('/:id', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], DescuentoController_1.DescuentoController.getById);
//crear nueva medida
router.post('/', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], DescuentoController_1.DescuentoController.newDescuento);
//editar una medida
router.patch('/:id', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], DescuentoController_1.DescuentoController.editDescuento);
//eliminar una medida
router.delete('/:id', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], DescuentoController_1.DescuentoController.deleteDescuento);
exports.default = router;
//# sourceMappingURL=descuento.js.map