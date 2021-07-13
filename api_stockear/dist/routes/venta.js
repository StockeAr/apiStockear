"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var VentaController_1 = require("../controller/VentaController");
var rol_1 = require("../middleware/rol");
var jwt_1 = require("../middleware/jwt");
var router = express_1.Router();
//Obtener todas las venta realizadas por el usuario logueado
router.get('/', [jwt_1.checkJwt], VentaController_1.VentaController.getAll);
//obtener una venta del usuario logueado
router.get('/find/:id', [jwt_1.checkJwt], VentaController_1.VentaController.getById);
//Obtener todas las ventas del empleado
router.get('/empleados', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], VentaController_1.VentaController.getEmpleadosVentas);
//estadisticas
router.get('/estadisticas', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], VentaController_1.VentaController.estadisticas);
//Crear una nueva venta
router.post('/', [jwt_1.checkJwt], VentaController_1.VentaController.newVenta);
exports.default = router;
//# sourceMappingURL=venta.js.map