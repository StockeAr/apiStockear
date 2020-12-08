"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var MedidaController_1 = require("../controller/MedidaController");
var router = express_1.Router();
router.get('/', MedidaController_1.MedidaController.getAll);
router.patch('/:id', MedidaController_1.MedidaController.editMedida);
router.post('/', MedidaController_1.MedidaController.new);
exports.default = router;
//# sourceMappingURL=medida.js.map