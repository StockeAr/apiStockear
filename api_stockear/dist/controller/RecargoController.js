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
exports.RecargoController = void 0;
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var Recargo_1 = require("../entity/Recargo");
var RecargoController = /** @class */ (function () {
    function RecargoController() {
    }
    RecargoController.getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, recargoRepo, recargo, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = res.locals.jwtPayload.userId;
                    recargoRepo = typeorm_1.getRepository(Recargo_1.Recargo);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, recargoRepo.find({
                            where: { user: userId }
                        })];
                case 2:
                    recargo = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    res.status(404).json({ message: 'Algo anda mal' });
                    return [3 /*break*/, 4];
                case 4:
                    if (recargo.length > 0) {
                        res.send(recargo);
                    }
                    else {
                        res.status(404).json({ message: 'No hubo resultado' });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    RecargoController.getById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, userId, recargoRepo, recargo, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    userId = res.locals.jwtPayload.userId;
                    recargoRepo = typeorm_1.getRepository(Recargo_1.Recargo);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, recargoRepo.findOneOrFail(id, {
                            select: ['id', 'descripcion', 'monto', 'tipo'],
                            where: { user: userId }
                        })];
                case 2:
                    recargo = _a.sent();
                    res.send(recargo);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    res.status(404).json({ message: 'No hubo resultado' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    RecargoController.newRecargo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, descripcion, monto, tipo, userId, recargo, opcionesValidacion, errors, recargoRepo, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, descripcion = _a.descripcion, monto = _a.monto, tipo = _a.tipo;
                    userId = res.locals.jwtPayload.userId;
                    recargo = new Recargo_1.Recargo();
                    recargo.descripcion = descripcion;
                    recargo.user = userId;
                    recargo.monto = monto;
                    recargo.tipo = tipo;
                    opcionesValidacion = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(recargo, opcionesValidacion)];
                case 1:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(404).json(errors)];
                    }
                    recargoRepo = typeorm_1.getRepository(Recargo_1.Recargo);
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, recargoRepo.save(recargo)];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_2 = _b.sent();
                    console.log(e_2);
                    return [2 /*return*/, res.status(404).json({ message: 'algo salio mal' })];
                case 5:
                    res.status(201).json({ message: 'recargo Agregado' });
                    return [2 /*return*/];
            }
        });
    }); };
    RecargoController.editRecargo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var recargo, id, _a, descripcion, monto, tipo, userId, recargoRepo, e_3, opcionesValidacion, errors, e_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    _a = req.body, descripcion = _a.descripcion, monto = _a.monto, tipo = _a.tipo;
                    userId = res.locals.jwtPayload.userId;
                    recargoRepo = typeorm_1.getRepository(Recargo_1.Recargo);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, recargoRepo.findOneOrFail(id, {
                            where: { user: userId }
                        })];
                case 2:
                    recargo = _b.sent();
                    recargo.descripcion = descripcion;
                    recargo.monto = monto;
                    recargo.tipo = tipo;
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _b.sent();
                    return [2 /*return*/, res.status(404).json({ message: 'categoria no encontrada' })];
                case 4:
                    opcionesValidacion = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(recargo, opcionesValidacion)];
                case 5:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json(errors)];
                    }
                    _b.label = 6;
                case 6:
                    _b.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, recargoRepo.save(recargo)];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_4 = _b.sent();
                    return [2 /*return*/, res.status(409).json({ message: 'El nombre del recargo ya esta en uso' })];
                case 9:
                    res.status(201).json({ message: 'recargo editado' });
                    return [2 /*return*/];
            }
        });
    }); };
    RecargoController.deleteRecargo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, adminId, recargoRepo, recargo, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    adminId = res.locals.jwtPayload.adminId;
                    recargoRepo = typeorm_1.getRepository(Recargo_1.Recargo);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, recargoRepo.find({
                            where: { user: adminId, id: id }
                        })];
                case 2:
                    recargo = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [2 /*return*/, res.status(404).json({ message: 'recargo no encontrado' })];
                case 4:
                    //eliminando categoria para
                    recargoRepo.delete(id);
                    res.status(201).json({ message: 'recargo eliminado' });
                    return [2 /*return*/];
            }
        });
    }); };
    return RecargoController;
}());
exports.RecargoController = RecargoController;
//# sourceMappingURL=RecargoController.js.map