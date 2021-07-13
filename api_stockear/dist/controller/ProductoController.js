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
exports.ProductoController = void 0;
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var Producto_1 = require("../entity/Producto");
var User_1 = require("../entity/User");
var ProductoController = /** @class */ (function () {
    function ProductoController() {
    }
    ProductoController.getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, userRepository, user, id, e_1, productoRepo, producto, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = res.locals.jwtPayload.userId;
                    userRepository = typeorm_1.getRepository(User_1.User);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail({
                            select: ['adminId'],
                            where: { id: userId }
                        })];
                case 2:
                    user = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    return [2 /*return*/, res.status(404).json({ message: 'no se encontro usuario' })];
                case 4:
                    //esto es para comprobar si es admin o emleado (en el ultimo caso identificar el id de su admin)
                    if (user.adminId == 0) {
                        id = userId;
                    }
                    else {
                        id = user.adminId;
                    }
                    productoRepo = typeorm_1.getRepository(Producto_1.Producto);
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, productoRepo
                            .createQueryBuilder("producto")
                            .select([
                            "producto.id",
                            "producto.descripcion",
                            "producto.costo",
                            "producto.cantidad",
                            "producto.minExistencia",
                            "producto.imagen",
                            "categoria.descripcion",
                            "medida.descripcion"
                        ])
                            .leftJoin("producto.categoria", "categoria")
                            .leftJoin("producto.medida", "medida")
                            .where("producto.user=:id", { id: id })
                            .orderBy("producto.modificado", "DESC")
                            .getMany()];
                case 6:
                    /* producto = await productoRepo.find({
                        select: ['id', 'descripcion', 'costo', 'cantidad', 'minExistencia', 'imagen', 'medida'],
                        where: { user: id },
                        relations: ['categoria', 'medida']
                    }) */
                    producto = _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    e_2 = _a.sent();
                    console.log(e_2);
                    return [2 /*return*/, res.status(404).json({ message: 'Algo anda mal :V' })];
                case 8:
                    //console.log(producto)
                    //aqui comprobamos si existe algun producto
                    if (producto.length > 0) {
                        return [2 /*return*/, res.send(producto)];
                    }
                    else {
                        return [2 /*return*/, res.status(404).json({ message: 'No Hubo resultado' })];
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    ProductoController.getById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, userId, productoRepo, producto, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    userId = res.locals.jwtPayload.userId;
                    productoRepo = typeorm_1.getRepository(Producto_1.Producto);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, productoRepo.findOneOrFail(id, {
                            select: ['id', 'descripcion', 'costo', 'cantidad', 'minExistencia', 'medida', 'imagen'],
                            where: { user: userId },
                            relations: ['categoria', 'medida']
                        })];
                case 2:
                    producto = _a.sent();
                    res.send(producto);
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    console.log(e_3);
                    res.status(404).json({ message: 'No hubo resultado' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    ProductoController.newProducto = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, descripcion, costo, cantidad, minExistencia, categoriaId, medidaId, imagen, userId, producto, fecha, opcionesValidacion, errors, productoRepo, e_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, descripcion = _a.descripcion, costo = _a.costo, cantidad = _a.cantidad, minExistencia = _a.minExistencia, categoriaId = _a.categoriaId, medidaId = _a.medidaId, imagen = _a.imagen;
                    userId = res.locals.jwtPayload.userId;
                    producto = new Producto_1.Producto();
                    fecha = new Date();
                    producto.descripcion = descripcion;
                    producto.costo = parseFloat(costo);
                    producto.cantidad = parseFloat(cantidad);
                    producto.minExistencia = parseFloat(minExistencia);
                    producto.creado = fecha;
                    producto.modificado = fecha;
                    producto.user = userId;
                    if (medidaId && medidaId != "") {
                        producto.medida = medidaId;
                    }
                    else {
                        producto.medida = null;
                    }
                    if (imagen && imagen != "") {
                        producto.imagen = imagen;
                    }
                    else {
                        producto.imagen = null;
                    }
                    //producto.medida=medidaId;
                    producto.categoria = categoriaId;
                    opcionesValidacion = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(producto, opcionesValidacion)];
                case 1:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(404).json({ message: "existen algunos errores, vea la consola", errors: errors })];
                    }
                    productoRepo = typeorm_1.getRepository(Producto_1.Producto);
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, productoRepo.save(producto)];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_4 = _b.sent();
                    console.log(e_4);
                    return [2 /*return*/, res.status(409).json({ message: 'El producto ya existe' })];
                case 5: return [2 /*return*/, res.status(201).json({ message: 'producto creado' })];
            }
        });
    }); };
    ProductoController.editProducto = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, _a, descripcion, costo, cantidad, minExistencia, imagen, medidaId, categoriaId, userId, fecha, productoRepo, producto, e_5, opcionesValidacion, errors, e_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    _a = req.body, descripcion = _a.descripcion, costo = _a.costo, cantidad = _a.cantidad, minExistencia = _a.minExistencia, imagen = _a.imagen, medidaId = _a.medidaId, categoriaId = _a.categoriaId;
                    userId = res.locals.jwtPayload.userId;
                    fecha = new Date();
                    productoRepo = typeorm_1.getRepository(Producto_1.Producto);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, productoRepo.findOneOrFail(id, {
                            where: { user: userId }
                        })];
                case 2:
                    producto = _b.sent();
                    console.log('encuentro: ' + JSON.stringify(producto));
                    producto.descripcion = descripcion;
                    producto.costo = costo;
                    producto.cantidad = parseFloat(cantidad);
                    producto.minExistencia = minExistencia;
                    if (medidaId) {
                        producto.medida = medidaId;
                    }
                    else {
                        producto.medida = null;
                    }
                    if (imagen === "") {
                        producto.imagen = null;
                    }
                    else {
                        producto.imagen = imagen;
                    }
                    producto.categoria = categoriaId;
                    producto.modificado = fecha;
                    return [3 /*break*/, 4];
                case 3:
                    e_5 = _b.sent();
                    return [2 /*return*/, res.status(404).json({ message: 'Producto no encontrado' })];
                case 4:
                    opcionesValidacion = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(producto, opcionesValidacion)];
                case 5:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json({ message: "existen algunos errores, vea la consola", errors: errors })];
                    }
                    _b.label = 6;
                case 6:
                    _b.trys.push([6, 8, , 9]);
                    //console.log('guardo: '+JSON.stringify(producto));
                    return [4 /*yield*/, productoRepo.save(producto)];
                case 7:
                    //console.log('guardo: '+JSON.stringify(producto));
                    _b.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_6 = _b.sent();
                    return [2 /*return*/, res.status(409).json({ message: 'El Producto ya existe' })];
                case 9: return [2 /*return*/, res.status(201).json({ message: 'Producto modificado' })];
            }
        });
    }); };
    ProductoController.deleteProducto = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, userId, productoRepo, producto, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    userId = res.locals.jwtPayload.userId;
                    productoRepo = typeorm_1.getRepository(Producto_1.Producto);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, productoRepo.findOneOrFail({
                            where: { id: id, user: userId }
                        })];
                case 2:
                    producto = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_7 = _a.sent();
                    console.log(e_7);
                    return [2 /*return*/, res.status(404).json({ message: 'Producto no encontrado' })];
                case 4:
                    //eliminando el producto
                    productoRepo.delete(id);
                    return [2 /*return*/, res.status(201).json({ message: 'Producto eliminado' })];
            }
        });
    }); };
    return ProductoController;
}());
exports.ProductoController = ProductoController;
//# sourceMappingURL=ProductoController.js.map