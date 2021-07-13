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
exports.UserController = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("../entity/User");
var class_validator_1 = require("class-validator");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    //Obtener todos los usuarios
    UserController.getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, userRepository, users, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = res.locals.jwtPayload.userId;
                    userRepository = typeorm_1.getRepository(User_1.User);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.find({
                            select: ['id', 'username', 'nombre', 'apellido', 'rol', 'modificado'],
                            where: { adminId: userId }
                        })];
                case 2:
                    users = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    return [2 /*return*/, res.status(404).json({ message: 'Algo anda mal :v' })];
                case 4:
                    //aqui comprobamos si existe algun usuario
                    if (users.length > 0) {
                        return [2 /*return*/, res.send(users)];
                    }
                    else {
                        return [2 /*return*/, res.status(404).json({ message: 'No Hubo resultado' })];
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    UserController.getById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, userId, userRepository, user, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    userId = res.locals.jwtPayload.userId;
                    userRepository = typeorm_1.getRepository(User_1.User);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail(id, {
                            select: ['id', 'username', 'nombre', 'apellido', 'rol', 'creado', 'modificado'],
                            where: { adminId: userId }
                        })];
                case 2:
                    user = _a.sent();
                    return [2 /*return*/, res.send(user)];
                case 3:
                    e_2 = _a.sent();
                    return [2 /*return*/, res.status(404).json({ message: 'No hubo resultado' })];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    UserController.newUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, username, password, nombre, apellido, _b, userId, negocioId, user, fecha, opcionesValidacion, errors, userRepository, e_3;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = req.body, username = _a.username, password = _a.password, nombre = _a.nombre, apellido = _a.apellido;
                    _b = res.locals.jwtPayload, userId = _b.userId, negocioId = _b.negocioId;
                    user = new User_1.User();
                    fecha = new Date();
                    user.username = username;
                    user.password = password;
                    user.rol = "empleado";
                    user.resetToken = 'vacio';
                    user.refreshToken = 'vacio';
                    user.creado = fecha;
                    user.modificado = fecha;
                    user.adminId = userId;
                    user.nombre = nombre;
                    user.apellido = apellido;
                    user.negocio = negocioId;
                    opcionesValidacion = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(user, opcionesValidacion)];
                case 1:
                    errors = _c.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(404).json({ message: "existen algunos errores, vea la consola", errors: errors })];
                    }
                    userRepository = typeorm_1.getRepository(User_1.User);
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 4, , 5]);
                    user.hashPassword();
                    return [4 /*yield*/, userRepository.save(user)];
                case 3:
                    _c.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_3 = _c.sent();
                    console.log(e_3);
                    return [2 /*return*/, res.status(409).json({ message: 'El nombre de usuario existe' })];
                case 5: 
                //si todo esta bien mando un mensaje al front
                return [2 /*return*/, res.status(201).json({ message: 'usuario creado' })];
            }
        });
    }); };
    UserController.editUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, id, _a, username, rol, userId, fecha, userRepository, e_4, opcionesValidacion, errors, e_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    _a = req.body, username = _a.username, rol = _a.rol;
                    userId = res.locals.jwtPayload.userId;
                    fecha = new Date();
                    userRepository = typeorm_1.getRepository(User_1.User);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail(id, {
                            where: { adminId: userId }
                        })];
                case 2:
                    user = _b.sent();
                    user.username = username;
                    user.rol = rol;
                    user.modificado = fecha;
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _b.sent();
                    return [2 /*return*/, res.status(404).json({ message: 'Usuario no encontrado' })];
                case 4:
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
                    return [4 /*yield*/, userRepository.save(user)];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_5 = _b.sent();
                    return [2 /*return*/, res.status(409).json({ message: 'El usuario esta en uso' })];
                case 9: return [2 /*return*/, res.status(201).json({ message: 'usuario se ha modificado' })];
            }
        });
    }); };
    UserController.deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, userId, userRepository, user, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    userId = res.locals.jwtPayload.userId;
                    userRepository = typeorm_1.getRepository(User_1.User);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.find({
                            where: { id: id, adminId: userId }
                        })];
                case 2:
                    user = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_6 = _a.sent();
                    console.log(e_6);
                    return [2 /*return*/, res.status(404).json({ message: 'Usuario no encontrado' })];
                case 4:
                    //eliminando el usuario
                    userRepository.delete(id);
                    return [2 /*return*/, res.status(201).json({ message: 'Usuario eliminado' })];
            }
        });
    }); };
    return UserController;
}());
exports.UserController = UserController;
exports.default = UserController;
//# sourceMappingURL=UserController.js.map