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
var typeorm_1 = require("typeorm");
var Medida_1 = require("../entity/Medida");
var MedidaController = /** @class */ (function () {
    function MedidaController() {
    }
    MedidaController.getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var medidaRepo, medida, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    medidaRepo = typeorm_1.getRepository(Medida_1.Medida);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, medidaRepo.find()];
                case 2:
                    medida = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    res.status(404).json({ message: 'Algo anda mal' });
                    return [3 /*break*/, 4];
                case 4:
                    res.send(medida);
                    return [2 /*return*/];
            }
        });
    }); };
    MedidaController.new = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var nombre, medida, medidaRepo, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nombre = req.body.nombre;
                    medida = new Medida_1.Medida();
                    medida.nombre = nombre;
                    medidaRepo = typeorm_1.getRepository(Medida_1.Medida);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, medidaRepo.save(medida)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    return [2 /*return*/, res.status(404).json({ message: 'algo salio mal' })];
                case 4:
                    res.send('Medida agregada');
                    return [2 /*return*/];
            }
        });
    }); };
    MedidaController.editMedida = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var medida, id, nombre, medidaRepo, e_3, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    nombre = req.body.nombre;
                    medidaRepo = typeorm_1.getRepository(Medida_1.Medida);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, medidaRepo.findOneOrFail(id)];
                case 2:
                    medida = _a.sent();
                    medida.nombre = nombre;
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    return [2 /*return*/, res.status(404).json({ message: 'Medida no encontrada' })];
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, medidaRepo.save(medida)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    e_4 = _a.sent();
                    return [2 /*return*/, res.status(409).json({ message: 'El nombre de la medida ya esta en uso' })];
                case 7:
                    res.status(201).json({ message: 'Medida editada' });
                    return [2 /*return*/];
            }
        });
    }); };
    return MedidaController;
}());
exports.MedidaController = MedidaController;
//# sourceMappingURL=MedidaController.js.map