"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var IngredienteController_1 = require("../controller/IngredienteController");
var router = express_1.Router();
router.get('/', IngredienteController_1.IngredienteController.getAll);
router.post('/', IngredienteController_1.IngredienteController.newIngrediente);
exports.default = router;
//# sourceMappingURL=ingrediente.js.map