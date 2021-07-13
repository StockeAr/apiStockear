"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var MedidaController_1 = require("../controller/MedidaController");
var jwt_1 = require("../middleware/jwt");
var rol_1 = require("../middleware/rol");
var router = express_1.Router();
//obtener todas las medidas
router.get('/', [jwt_1.checkJwt], MedidaController_1.MedidaController.getAll);
//obtener una medida
router.get('/:id', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], MedidaController_1.MedidaController.getById);
//crear nueva medida
router.post('/', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], MedidaController_1.MedidaController.newMedida);
//editar una medida
router.patch('/:id', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], MedidaController_1.MedidaController.editMedida);
//eliminar una medida
router.delete('/:id', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], MedidaController_1.MedidaController.deleteMedida);
router.get('/info/info', MedidaController_1.MedidaController.info);
router.get('/order', MedidaController_1.MedidaController.order);
exports.default = router;
//# sourceMappingURL=medida.js.map