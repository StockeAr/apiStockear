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
exports.CategoriaController = void 0;
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var Categoria_1 = require("../entity/Categoria");
var CategoriaController = /** @class */ (function () {
    function CategoriaController() {
    }
    CategoriaController.getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, userId, adminId, id, categoriaRepo, categoria, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = res.locals.jwtPayload, userId = _a.userId, adminId = _a.adminId;
                    if (adminId != 0) {
                        id = adminId;
                    }
                    else {
                        id = userId;
                    }
                    categoriaRepo = typeorm_1.getRepository(Categoria_1.Categoria);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, categoriaRepo.find({
                            select: ['id', 'descripcion'],
                            where: { user: id }
                        })];
                case 2:
                    categoria = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _b.sent();
                    return [2 /*return*/, res.status(404).json({ message: 'Algo anda mal' })];
                case 4:
                    if (categoria.length > 0) {
                        return [2 /*return*/, res.send(categoria)];
                    }
                    else {
                        return [2 /*return*/, res.status(404).json({ message: 'No hubo resultado' })];
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    CategoriaController.getById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, userId, categoriaRepo, categoria, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    userId = res.locals.jwtPayload.userId;
                    categoriaRepo = typeorm_1.getRepository(Categoria_1.Categoria);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, categoriaRepo.findOneOrFail(id, {
                            select: ['id', 'descripcion'],
                            where: { user: userId }
                        })];
                case 2:
                    categoria = _a.sent();
                    return [2 /*return*/, res.send(categoria)];
                case 3:
                    error_1 = _a.sent();
                    return [2 /*return*/, res.status(404).json({ message: 'No hubo resultado' })];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    CategoriaController.newCategoria = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var descripcion, userId, categoria, opcionesValidacion, errors, categoriaRepo, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    descripcion = req.body.descripcion;
                    userId = res.locals.jwtPayload.userId;
                    categoria = new Categoria_1.Categoria();
                    categoria.descripcion = descripcion;
                    categoria.user = userId;
                    opcionesValidacion = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(categoria, opcionesValidacion)];
                case 1:
                    errors = _a.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(404).json({ message: "existen algunos errores, vea la consola", errors: errors })];
                    }
                    categoriaRepo = typeorm_1.getRepository(Categoria_1.Categoria);
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, categoriaRepo.save(categoria)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_2 = _a.sent();
                    console.log(e_2);
                    return [2 /*return*/, res.status(404).json({ message: 'algo salio mal' })];
                case 5: return [2 /*return*/, res.status(201).json({ message: 'categoria Agregada' })];
            }
        });
    }); };
    CategoriaController.editCategoria = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var categoria, id, descripcion, userId, categoriaRepo, e_3, opcionesValidacion, errors, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    descripcion = req.body.descripcion;
                    userId = res.locals.jwtPayload.userId;
                    categoriaRepo = typeorm_1.getRepository(Categoria_1.Categoria);
                    if (descripcion.length <= 0) {
                        return [2 /*return*/, res.status(404).json({ message: 'debe proporcionar un valor' })];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, categoriaRepo.findOneOrFail(id, {
                            where: { user: userId }
                        })];
                case 2:
                    categoria = _a.sent();
                    categoria.descripcion = descripcion;
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    return [2 /*return*/, res.status(404).json({ message: 'categoria no encontrada' })];
                case 4:
                    opcionesValidacion = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(categoria, opcionesValidacion)];
                case 5:
                    errors = _a.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json({ message: "existen algunos errores, vea la consola", errors: errors })];
                    }
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, categoriaRepo.save(categoria)];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_4 = _a.sent();
                    return [2 /*return*/, res.status(409).json({ message: 'El nombre de la categoria ya esta en uso' })];
                case 9: return [2 /*return*/, res.status(201).json({ message: 'categoria editada' })];
            }
        });
    }); };
    CategoriaController.deleteCategoria = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, adminId, categoriaRepo, categoria, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    adminId = res.locals.jwtPayload.adminId;
                    categoriaRepo = typeorm_1.getRepository(Categoria_1.Categoria);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, categoriaRepo.find({
                            where: { user: adminId, id: id }
                        })];
                case 2:
                    categoria = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [2 /*return*/, res.status(404).json({ message: 'categoria no encontrada' })];
                case 4:
                    //eliminando categoria para
                    categoriaRepo.delete(id);
                    res.status(201).json({ message: 'categoria eliminada' });
                    return [2 /*return*/];
            }
        });
    }); };
    return CategoriaController;
}());
exports.CategoriaController = CategoriaController;
//# sourceMappingURL=CategoriaController.js.map