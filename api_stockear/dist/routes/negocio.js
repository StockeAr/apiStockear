"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var NegocioController_1 = require("../controller/NegocioController");
var jwt_1 = require("../middleware/jwt");
var rol_1 = require("../middleware/rol");
var router = express_1.Router();
//datos del negocio
router.get('/find', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], NegocioController_1.NegocioController.getData);
//crear negocio;
router.post('/new', NegocioController_1.NegocioController.new);
//editar info del negocio
router.patch('/edit', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], NegocioController_1.NegocioController.edit);
exports.default = router;
//# sourceMappingURL=negocio.js.map