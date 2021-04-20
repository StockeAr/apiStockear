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
exports.MedidaController = void 0;
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var Medida_1 = require("../entity/Medida");
var User_1 = require("../entity/User");
var MedidaController = /** @class */ (function () {
    function MedidaController() {
    }
    MedidaController.getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, medidaRepo, medida, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = res.locals.jwtPayload.userId;
                    medidaRepo = typeorm_1.getRepository(Medida_1.Medida);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, medidaRepo.find({
                            where: { user: userId }
                        })];
                case 2:
                    medida = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    res.status(404).json({ message: 'Algo anda mal' });
                    return [3 /*break*/, 4];
                case 4:
                    if (medida.length > 0) {
                        res.send(medida);
                    }
                    else {
                        res.status(404).json({ message: 'No hubo resultado' });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    MedidaController.getById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, userId, medidaRepo, medida, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    userId = res.locals.jwtPayload.userId;
                    medidaRepo = typeorm_1.getRepository(Medida_1.Medida);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, medidaRepo.findOneOrFail(id, {
                            select: ['id', 'descripcion'],
                            where: { user: userId }
                        })];
                case 2:
                    medida = _a.sent();
                    res.send(medida);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    res.status(404).json({ message: 'No hubo resultado' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    MedidaController.newMedida = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var descripcion, userId, medida, opcionesValidacion, errors, medidaRepo, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    descripcion = req.body.descripcion;
                    userId = res.locals.jwtPayload.userId;
                    medida = new Medida_1.Medida();
                    medida.descripcion = descripcion;
                    opcionesValidacion = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(medida, opcionesValidacion)];
                case 1:
                    errors = _a.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(404).json(errors)];
                    }
                    medidaRepo = typeorm_1.getRepository(Medida_1.Medida);
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, medidaRepo.save(medida)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_2 = _a.sent();
                    console.log(e_2);
                    return [2 /*return*/, res.status(404).json({ message: 'algo salio mal' })];
                case 5:
                    res.status(201).json({ message: 'Medida Agregada' });
                    return [2 /*return*/];
            }
        });
    }); };
    MedidaController.editMedida = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var medida, id, descripcion, userId, medidaRepo, e_3, opcionesValidacion, errors, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    descripcion = req.body.descripcion;
                    userId = res.locals.jwtPayload.userId;
                    medidaRepo = typeorm_1.getRepository(Medida_1.Medida);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, medidaRepo.findOneOrFail(id, {
                            where: { user: userId }
                        })];
                case 2:
                    medida = _a.sent();
                    medida.descripcion = descripcion;
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    return [2 /*return*/, res.status(404).json({ message: 'Medida no encontrada' })];
                case 4:
                    opcionesValidacion = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(medida, opcionesValidacion)];
                case 5:
                    errors = _a.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json(errors)];
                    }
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, medidaRepo.save(medida)];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_4 = _a.sent();
                    return [2 /*return*/, res.status(409).json({ message: 'El nombre de la medida ya esta en uso' })];
                case 9:
                    res.status(201).json({ message: 'Medida editada' });
                    return [2 /*return*/];
            }
        });
    }); };
    MedidaController.deleteMedida = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, adminId, medidaRepo, medida, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    adminId = res.locals.jwtPayload.adminId;
                    medidaRepo = typeorm_1.getRepository(Medida_1.Medida);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, medidaRepo.find({
                            where: { user: adminId, id: id }
                        })];
                case 2:
                    medida = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [2 /*return*/, res.status(404).json({ message: 'Medida no encontrada' })];
                case 4:
                    //eliminando medida para
                    medidaRepo.delete(id);
                    res.status(201).json({ message: 'Medida eliminada' });
                    return [2 /*return*/];
            }
        });
    }); };
    MedidaController.info = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var medidaRepo, medida, userRepo, users, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    medidaRepo = typeorm_1.getRepository(Medida_1.Medida);
                    userRepo = typeorm_1.getRepository(User_1.User);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepo.find({ relations: ['medidas', 'categorias', 'descuentos', 'recargos'] })];
                case 2:
                    //medida = await medidaRepo.find({ relations: ['ingredientes'] });
                    /* medida = await medidaRepo.createQueryBuilder("medida")
                        .innerJoinAndSelect("medida.ingredientes", "ingrediente")
                        .getMany(); */
                    //ambas funciones realizan el mismo trabajo.
                    /* medida = await medidaRepo
                        .createQueryBuilder()
                        .select("medida.id,medida.nombre")
                        .addSelect("CONCAT(medida.id,medida.nombre)", "calc")
                        .getRawMany(); */
                    //para mas informacion consultar documentacion de typeorm->select query builder->Getting values using querybuilder
                    /* users=await userRepo.find({
                        select: ['id', 'username','rol'],
                        join: {
                            alias: 'user',
                            innerJoinAndSelect: {
                                medida: 'user.medidas',
                                categoria:'user.categorias',
                                recargo: 'user.recargos',
                                descuento: 'user.descuentos',
                            }
                        },
                    }); */
                    users = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_5 = _a.sent();
                    console.log(e_5);
                    res.status(404).json({ message: 'algo anda mal >:v' });
                    return [3 /*break*/, 4];
                case 4:
                    res.send(users);
                    return [2 /*return*/];
            }
        });
    }); };
    MedidaController.order = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var orderBy, medidaRepo, medida, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    orderBy = req.body.orderBy;
                    medidaRepo = typeorm_1.getRepository(Medida_1.Medida);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 11, , 12]);
                    console.log("esto me llego: " + orderBy);
                    if (!orderBy) return [3 /*break*/, 8];
                    if (!(orderBy == 'ASC')) return [3 /*break*/, 3];
                    return [4 /*yield*/, medidaRepo.find({ order: { descripcion: 'ASC' } })];
                case 2:
                    medida = _a.sent();
                    return [3 /*break*/, 7];
                case 3:
                    if (!(orderBy == 'DESC')) return [3 /*break*/, 5];
                    return [4 /*yield*/, medidaRepo.find({ order: { descripcion: 'DESC' } })];
                case 4:
                    medida = _a.sent();
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, medidaRepo.find()];
                case 6:
                    medida = _a.sent();
                    _a.label = 7;
                case 7: return [3 /*break*/, 10];
                case 8:
                    console.log("no mando orderBY");
                    return [4 /*yield*/, medidaRepo.find()];
                case 9:
                    medida = _a.sent();
                    _a.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    e_6 = _a.sent();
                    res.status(404).json({ message: 'Algo anda mal' });
                    return [3 /*break*/, 12];
                case 12:
                    res.send(medida);
                    return [2 /*return*/];
            }
        });
    }); };
    return MedidaController;
}());
exports.MedidaController = MedidaController;
exports.default = MedidaController;
//# sourceMappingURL=MedidaController.js.map