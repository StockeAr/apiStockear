"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var RecargoController_1 = require("../controller/RecargoController");
var jwt_1 = require("../middleware/jwt");
var rol_1 = require("../middleware/rol");
var router = express_1.Router();
//obtener todas las medidas
router.get('/', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], RecargoController_1.RecargoController.getAll);
//obtener una medida
router.get('/:id', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], RecargoController_1.RecargoController.getById);
//crear nueva medida
router.post('/', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], RecargoController_1.RecargoController.newRecargo);
//editar una medida
router.patch('/:id', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], RecargoController_1.RecargoController.editRecargo);
//eliminar una medida
router.delete('/:id', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], RecargoController_1.RecargoController.deleteRecargo);
exports.default = router;
//# sourceMappingURL=recargo.js.map