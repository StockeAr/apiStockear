"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthController_1 = require("../controller/AuthController");
var jwt_1 = require("../middleware/jwt");
var rol_1 = require("../middleware/rol");
var router = express_1.Router();
//login
router.post('/login', AuthController_1.default.login);
//olvido su contraseña
router.put('/forgot-password', AuthController_1.default.forgotPassword);
//crear una nueva contraseña
router.put('/new-password', AuthController_1.default.createNewPassword);
//
router.post('/refresh-token', AuthController_1.default.refreshToken);
//cambiar la contraseña, para ademas restringir sola al admin, se debe importar el checkRol
router.post('/change-password', [jwt_1.checkJwt], AuthController_1.default.changePassword);
//registrarse
router.post('/register', AuthController_1.default.newAdmin);
//editar perfil de admin
router.patch('/edit', [jwt_1.checkJwt, rol_1.chekRol(['admin'])], AuthController_1.default.editarPerfil);
exports.default = router;
//# sourceMappingURL=auth.js.map