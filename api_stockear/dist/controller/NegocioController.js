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
exports.NegocioController = void 0;
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var Negocio_1 = require("../entity/Negocio");
var User_1 = require("../entity/User");
var NegocioController = /** @class */ (function () {
    function NegocioController() {
    }
    NegocioController.getData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var negocioId, negocio, negocioRepo, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    negocioId = res.locals.jwtPayload.negocioId;
                    negocioRepo = typeorm_1.getRepository(Negocio_1.Negocio);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, negocioRepo.findOneOrFail(negocioId, {
                            select: ['correo', 'descripcion', 'direccion', 'imagen', 'nombre', 'telefono']
                        })];
                case 2:
                    negocio = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.log("e: ", e_1);
                    return [2 /*return*/, res.status(404).json({ message: "no se encontro el negocio" })];
                case 4: return [2 /*return*/, res.status(200).json(negocio)];
            }
        });
    }); };
    NegocioController.new = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, img, name, descripcion, direccion, telefono, userId, userRepo, user, e_2, negocio, opcionesValidacion, errors, negocioRepo, aux, e_3, e_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, img = _a.img, name = _a.name, descripcion = _a.descripcion, direccion = _a.direccion, telefono = _a.telefono, userId = _a.userId;
                    userRepo = typeorm_1.getRepository(User_1.User);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepo.findOneOrFail(userId, { where: { negocio: null } })];
                case 2:
                    user = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _b.sent();
                    console.log('e: ', e_2);
                    return [2 /*return*/, res.status(400).json({ message: "algo anda mal 1" })];
                case 4:
                    negocio = new Negocio_1.Negocio();
                    negocio.imagen = img;
                    negocio.nombre = name;
                    negocio.descripcion = descripcion;
                    negocio.direccion = direccion;
                    negocio.telefono = telefono;
                    opcionesValidacion = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(negocio, opcionesValidacion)];
                case 5:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(404).json({ message: "existen algunos errores, vea la consola", errors: errors })];
                    }
                    negocioRepo = typeorm_1.getRepository(Negocio_1.Negocio);
                    _b.label = 6;
                case 6:
                    _b.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, negocioRepo.save(negocio)];
                case 7:
                    aux = _b.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_3 = _b.sent();
                    console.log('e: ', e_3);
                    return [2 /*return*/, res.status(400).json({ message: "algo anda mal" })];
                case 9:
                    _b.trys.push([9, 11, , 12]);
                    user.negocio = aux.id;
                    return [4 /*yield*/, userRepo.save(user)];
                case 10:
                    _b.sent();
                    return [3 /*break*/, 12];
                case 11:
                    e_4 = _b.sent();
                    return [2 /*return*/, res.status(400).json({ message: "algo anda mal, contactese con soporte" })];
                case 12: return [2 /*return*/, res.status(200).json({ message: 'negocio creado con exito, inicie session nuevamente' })];
            }
        });
    }); };
    NegocioController.edit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var negocioId, _a, img, descripcion, name, direccion, telefono, negocio, negocioRepo, e_5, opcionesValidacion, errors, e_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    negocioId = res.locals.jwtPayload.negocioId;
                    _a = req.body, img = _a.img, descripcion = _a.descripcion, name = _a.name, direccion = _a.direccion, telefono = _a.telefono;
                    negocioRepo = typeorm_1.getRepository(Negocio_1.Negocio);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, negocioRepo.findOneOrFail(negocioId)];
                case 2:
                    negocio = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_5 = _b.sent();
                    console.log('e: ', e_5);
                    return [2 /*return*/, res.status(404).json({ message: "no se encontro el negocio" })];
                case 4:
                    negocio.imagen = img;
                    negocio.nombre = name;
                    negocio.descripcion = descripcion;
                    negocio.direccion = direccion;
                    negocio.telefono = telefono;
                    opcionesValidacion = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(negocio, opcionesValidacion)];
                case 5:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json({ message: "existen algunos errores, vea la consola", errors: errors })];
                    }
                    _b.label = 6;
                case 6:
                    _b.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, negocioRepo.save(negocio)];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_6 = _b.sent();
                    console.log("e: ", e_6);
                    return [2 /*return*/, res.status(400).json({ message: "algo anda mal" })];
                case 9: return [2 /*return*/, res.status(200).json({ message: "negocio editado con exito" })];
            }
        });
    }); };
    return NegocioController;
}());
exports.NegocioController = NegocioController;
exports.default = NegocioController;
//# sourceMappingURL=NegocioController.js.map