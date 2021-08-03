"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var User_1 = require("../entity/User");
var jwt = require("jsonwebtoken");
var config_1 = require("../config/config");
var class_validator_1 = require("class-validator");
var mailer_1 = require("../config/mailer");
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, username, password, userRepository, user, e_1, token, refreshToken, role, userId, adminId, nombre, apellido, perfil, email, negocio, error_1;
        var _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _a = req.body, username = _a.username, password = _a.password;
                    if (!(username && password)) {
                        return [2 /*return*/, res.status(404).json({ message: 'Usuario y Contraseña son requeridos' })];
                    }
                    userRepository = typeorm_1.getRepository(User_1.User);
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail({
                            where: { username: username.toLowerCase() },
                            relations: ['negocio']
                        })];
                case 2:
                    user = _e.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _e.sent();
                    return [2 /*return*/, res.status(409).json({ message: 'Usuario / Contraseña son incorrectos' })];
                case 4:
                    if (user.activo == false) {
                        return [2 /*return*/, res.status(401).json({ message: "Cuenta Bloqueada" })];
                    }
                    //verificando la contraseña
                    if (!user.checkPassword(password)) {
                        return [2 /*return*/, res.status(404).json({ message: 'Usuario / Contraseña son incorrectos' })];
                    }
                    token = jwt.sign({ userId: user.id, username: user.username, adminId: user.adminId, negocioId: (_b = user.negocio) === null || _b === void 0 ? void 0 : _b.id }, config_1.default.jwtSecret, { expiresIn: '2h' });
                    refreshToken = jwt.sign({ userId: user.id, username: user.username, adminId: user.adminId, negocioId: (_c = user.negocio) === null || _c === void 0 ? void 0 : _c.id }, config_1.default.jwtSecretRefresh, { expiresIn: '2h' });
                    role = user.rol;
                    userId = user.id;
                    adminId = user.adminId;
                    nombre = user.nombre;
                    apellido = user.apellido;
                    perfil = user.imagen;
                    email = user.username;
                    negocio = ((_d = user.negocio) === null || _d === void 0 ? void 0 : _d.nombre) || null;
                    user.refreshToken = refreshToken;
                    _e.label = 5;
                case 5:
                    _e.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, userRepository.save(user)];
                case 6:
                    _e.sent();
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _e.sent();
                    return [2 /*return*/, res.status(404).json({ message: 'algo anda mal' })];
                case 8: return [2 /*return*/, res.json({ message: 'Ok', token: token, refreshToken: refreshToken, role: role, userId: userId, adminId: adminId, nombre: nombre, apellido: apellido, perfil: perfil, email: email, negocio: negocio })];
            }
        });
    }); };
    AuthController.changePassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, _a, oldPassword, newPassword, userRepository, user, e_2, opcionesValidacion, errors;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userId = res.locals.jwtPayload.userId;
                    _a = req.body, oldPassword = _a.oldPassword, newPassword = _a.newPassword;
                    if (!(oldPassword && newPassword)) {
                        return [2 /*return*/, res.status(400).json({ message: 'La contraseña nueva / anterior son requeridas' })];
                    }
                    userRepository = typeorm_1.getRepository(User_1.User);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail(userId)];
                case 2:
                    user = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _b.sent();
                    return [2 /*return*/, res.status(400).json({ message: 'Algo anda mal >:V ' })];
                case 4:
                    if (!user.checkPassword(oldPassword)) {
                        return [2 /*return*/, res.status(401).json({ message: 'Verifique su contraseña anterior' })];
                    }
                    user.password = newPassword;
                    opcionesValidacion = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(user, opcionesValidacion)];
                case 5:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json({ message: "existen algunos errores, vea la consola", errors: errors })];
                    }
                    //has de la contraseña
                    try {
                        user.hashPassword();
                        userRepository.save(user);
                    }
                    catch (e) {
                        return [2 /*return*/, res.status(400).json({ message: "algo anda mal " })];
                    }
                    return [2 /*return*/, res.json({ message: 'Se ha cambiado la contraseña' })];
            }
        });
    }); };
    AuthController.newAdmin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, username, password, nombre, apellido, confirmPassword, imagen, user, fecha, opcionesValidacion, errors, userRepository, e_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, username = _a.username, password = _a.password, nombre = _a.nombre, apellido = _a.apellido, confirmPassword = _a.confirmPassword, imagen = _a.imagen;
                    user = new User_1.User();
                    fecha = new Date();
                    user.username = username.toLowerCase();
                    user.password = password;
                    user.rol = 'admin';
                    user.creado = fecha;
                    user.modificado = fecha;
                    user.nombre = nombre;
                    user.apellido = apellido;
                    user.imagen = imagen;
                    opcionesValidacion = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(user, opcionesValidacion)];
                case 1:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(404).json({ message: "existen algunos errores, vea la consola", errors: errors })];
                    }
                    if (password != confirmPassword) {
                        return [2 /*return*/, res.status(409).json({ message: 'Las contraseñas no coinciden' })];
                    }
                    userRepository = typeorm_1.getRepository(User_1.User);
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    user.hashPassword();
                    return [4 /*yield*/, userRepository.save(user)];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_3 = _b.sent();
                    console.log(e_3);
                    return [2 /*return*/, res.status(409).json({ message: 'Este usuario ya esta registrado' })];
                case 5: 
                //si todo esta bien mando un mensaje al front
                return [2 /*return*/, res.status(201).json({ message: 'Registro exitoso' })];
            }
        });
    }); };
    AuthController.editarPerfil = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, _a, apellido, username, nombre, imagen, user, userRepo, e_4, opcionesValidacion, errors, e_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userId = res.locals.jwtPayload.userId;
                    _a = req.body, apellido = _a.apellido, username = _a.username, nombre = _a.nombre, imagen = _a.imagen;
                    userRepo = typeorm_1.getRepository(User_1.User);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepo.findOneOrFail(userId)];
                case 2:
                    user = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _b.sent();
                    return [2 /*return*/, res.status(400).json({ message: "algo salio mal" })];
                case 4:
                    user.apellido = apellido;
                    user.username = username;
                    user.nombre = nombre;
                    user.imagen = imagen;
                    opcionesValidacion = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(user, opcionesValidacion)];
                case 5:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json({ message: "existen algunos errores, vea la consola", errors: errors })];
                    }
                    _b.label = 6;
                case 6:
                    _b.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, userRepo.save(user)];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_5 = _b.sent();
                    return [2 /*return*/, res.status(400).json({ message: "algo anda mal" })];
                case 9: return [2 /*return*/, res.status(200).json({ message: "perfil editado con exito, inicie session nuevamente" })];
            }
        });
    }); };
    AuthController.forgotPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var username, message, verificationLink, emailStatus, userRepo, user, token, e_6, error_2, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = req.body.username;
                    if (!(username)) {
                        return [2 /*return*/, res.status(404).json({ message: "El nombre de usuario es necesario" })];
                    }
                    message = 'Se envio un link a su correo para reestablecer su contraseña.';
                    emailStatus = 'Ok';
                    userRepo = typeorm_1.getRepository(User_1.User);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepo.findOneOrFail({ where: { username: username } })];
                case 2:
                    user = _a.sent();
                    token = jwt.sign({ userId: user.id, username: user.username }, config_1.default.jwtSecretReset, { expiresIn: '10m' });
                    verificationLink = "http://localhost:3000/new-password/" + token;
                    //verificationLink = `http://apistockear.herokuapp.com/new-password/${token}`;
                    user.resetToken = token;
                    return [3 /*break*/, 4];
                case 3:
                    e_6 = _a.sent();
                    return [2 /*return*/, res.json({ message: message })];
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    //envio de email
                    return [4 /*yield*/, mailer_1.transporter.sendMail({
                            from: '"StockeAr ✔" <proyecto.pp3@gmail.com>',
                            to: user.username,
                            subject: "Recuperar contraseña 🤦‍♂️",
                            //text: "Hello world?", // plain text body
                            html: "\n                    <b>Por favor haga click en el siguiente link o copie en su navegador para completar el proceso</b>\n                    <a href=\"" + verificationLink + "\">" + verificationLink + "</a>\n                ",
                        })];
                case 5:
                    //envio de email
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    error_2 = _a.sent();
                    emailStatus = error_2;
                    return [2 /*return*/, res.status(400).json({ message: 'algo anda mal 1 :V' })];
                case 7:
                    _a.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, userRepo.save(user)];
                case 8:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 9:
                    error_3 = _a.sent();
                    emailStatus = error_3;
                    return [2 /*return*/, res.status(400).json({ message: 'Algo anda mal 2 :V' })];
                case 10: return [2 /*return*/, res.json({ message: message, info: emailStatus, test: verificationLink })];
            }
        });
    }); };
    AuthController.createNewPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var newPassword, resetToken, userRepo, user, jwtPayload, error_4, validationOps, errors, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newPassword = req.body.newPassword;
                    resetToken = req.headers['reset'];
                    if (!(resetToken && newPassword)) {
                        res.status(400).json({ message: 'Todos los campos son requeridos' });
                    }
                    userRepo = typeorm_1.getRepository(User_1.User);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    jwtPayload = jwt.verify(resetToken, config_1.default.jwtSecretReset);
                    return [4 /*yield*/, userRepo.findOneOrFail({ where: { resetToken: resetToken } })];
                case 2:
                    user = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    return [2 /*return*/, res.status(401).json({ message: 'algo anda mal' })];
                case 4:
                    user.password = newPassword;
                    validationOps = { validationError: { tarjet: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(user, validationOps)];
                case 5:
                    errors = _a.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json({ message: "existen algunos errores, vea la consola", errors: errors })];
                    }
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    user.hashPassword();
                    return [4 /*yield*/, userRepo.save(user)];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    error_5 = _a.sent();
                    return [2 /*return*/, res.status(401).json({ message: 'algo anda mal' })];
                case 9: return [2 /*return*/, res.json({ message: 'Contraseña cambiada' })];
            }
        });
    }); };
    AuthController.refreshToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var refreshToken, userRepo, user, verifyResult, username, error_6, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    refreshToken = req.headers['refresh'];
                    if (!(refreshToken)) {
                        return [2 /*return*/, res.status(400).json({ message: 'algo nada mal :V' })];
                    }
                    userRepo = typeorm_1.getRepository(User_1.User);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    verifyResult = jwt.verify(refreshToken, config_1.default.jwtSecretRefresh);
                    username = verifyResult.username;
                    return [4 /*yield*/, userRepo.findOneOrFail({ where: { username: username } })];
                case 2:
                    user = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _a.sent();
                    return [2 /*return*/, res.status(400).json({ message: 'algo anda mal :V x2' })];
                case 4:
                    token = jwt.sign({ userId: user.id, username: user.username }, config_1.default.jwtSecret, { expiresIn: '120' });
                    return [2 /*return*/, res.json({ message: 'Ok', token: token })];
            }
        });
    }); };
    return AuthController;
}());
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map