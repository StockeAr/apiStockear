"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = require("../controller/UserController");
var rol_1 = require("../middleware/rol");
var jwt_1 = require("../middleware/jwt");
var router = express_1.Router();
//Obtener todos los usuarios
router.get('/', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], UserController_1.UserController.getAll);
//Obtener un usuarios
router.get('/:id', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], UserController_1.UserController.getById);
//Crear un nuevo usuario
router.post('/', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], UserController_1.UserController.newUser);
//editar un usuario
router.patch('/:id', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], UserController_1.UserController.editUser);
//eliminar un usuario
router.delete('/:id', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], UserController_1.UserController.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map