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
exports.VentaController = void 0;
var typeorm_1 = require("typeorm");
var Producto_1 = require("../entity/Producto");
var User_1 = require("../entity/User");
var Venta_1 = require("../entity/Venta");
var VentaController = /** @class */ (function () {
    function VentaController() {
    }
    VentaController.getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, ventaRepo, venta, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = res.locals.jwtPayload.userId;
                    ventaRepo = typeorm_1.getRepository(Venta_1.Venta);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, ventaRepo.find({
                            select: ['total', 'fechaVenta', 'id'],
                            where: { user: userId }
                        })];
                case 2:
                    venta = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    res.status(404).json({ message: 'Algo anda mal', status: 404 });
                    return [3 /*break*/, 4];
                case 4:
                    if (venta.length > 0) {
                        res.send(venta);
                    }
                    else {
                        res.status(404).json({ message: 'No hubo resultado', status: 404 });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    VentaController.getById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, myQuery, ventaInfo, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    myQuery = typeorm_1.getManager();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, myQuery.query("select v_p.ventaId, p.descripcion as producto, c.descripcion as categoria,  p.costo, v_p.cantidad, v_p.totalParcial from venta_producto as v_p\n            inner join producto as p\n            on v_p.productoId=p.id\n            inner join categoria as c\n            on p.categoriaId=c.id\n            where v_p.ventaId=" + id)];
                case 2:
                    ventaInfo = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    return [2 /*return*/, res.status(404).json({ message: 'algo anda mal 1', status: 404 })];
                case 4:
                    if (ventaInfo.length > 0) {
                        res.send(ventaInfo);
                    }
                    else {
                        return [2 /*return*/, res.status(404).json({ message: 'no hubo resultado', status: 404 })];
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    VentaController.getEmpleadosVentas = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, ventaRepo, userRepo, empleados, venta, ventaEmpleado, e_3, i, _a, _b, e_4;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    userId = res.locals.jwtPayload.userId;
                    ventaRepo = typeorm_1.getRepository(Venta_1.Venta);
                    userRepo = typeorm_1.getRepository(User_1.User);
                    ventaEmpleado = [];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepo.find({
                            select: ['id'],
                            where: { adminId: userId }
                        })];
                case 2:
                    empleados = _c.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _c.sent();
                    res.status(404).json({ message: 'Algo anda mal 1 ', status: 404 });
                    return [3 /*break*/, 4];
                case 4:
                    _c.trys.push([4, 10, , 11]);
                    i = 0;
                    _c.label = 5;
                case 5:
                    if (!(i < empleados.length)) return [3 /*break*/, 9];
                    return [4 /*yield*/, ventaRepo.find({
                            select: ['total', 'fechaVenta', 'id'],
                            where: { userId: empleados[i].id },
                        })];
                case 6:
                    venta = _c.sent();
                    _b = (_a = ventaEmpleado).push;
                    return [4 /*yield*/, venta];
                case 7:
                    _b.apply(_a, [_c.sent()]);
                    _c.label = 8;
                case 8:
                    i++;
                    return [3 /*break*/, 5];
                case 9: return [3 /*break*/, 11];
                case 10:
                    e_4 = _c.sent();
                    console.log(e_4);
                    res.status(404).json({ message: 'Algo anda mal' });
                    return [3 /*break*/, 11];
                case 11:
                    //console.log(totalVenta)
                    if (ventaEmpleado.length > 0) {
                        //console.log(reporte);
                        res.send(ventaEmpleado);
                    }
                    else {
                        res.status(404).json({ message: 'No hubo resultado' });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    VentaController.newVenta = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, _a, idProd, cantidad, adminId, prodRepo, infoProd, auxMin, i, e_5, i, e_6, i, myQuery, ventaRepo, venta, idVentaProd, aux, total, fecha, i, e_7, i, i, i, e_8;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userId = res.locals.jwtPayload.userId;
                    _a = req.body, idProd = _a.idProd, cantidad = _a.cantidad, adminId = _a.adminId;
                    //compruebo si el tamaño de las cantidades es igual al tamaño de los id de productos
                    if (idProd.length != cantidad.length) {
                        return [2 /*return*/, res.status(409).json({ message: 'La cantidad de productos no coincide con la cantidad a vender de cada uno', status: 404 })];
                    }
                    if ((idProd.length == 0) || (cantidad.length == 0)) {
                        return [2 /*return*/, res.status(404).json({ message: 'no envio nada' })];
                    }
                    prodRepo = typeorm_1.getRepository(Producto_1.Producto);
                    infoProd = [];
                    if (!(parseInt(adminId) != 0)) return [3 /*break*/, 8];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, , 7]);
                    i = 0;
                    _b.label = 2;
                case 2:
                    if (!(i < idProd.length)) return [3 /*break*/, 5];
                    return [4 /*yield*/, prodRepo.find({
                            select: ['id', 'minExistencia', 'cantidad', 'descripcion', 'costo'],
                            where: { user: adminId, id: idProd[i] }
                        })];
                case 3:
                    auxMin = _b.sent();
                    if (auxMin.length > 0) {
                        infoProd.push(auxMin[0]);
                    }
                    _b.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 7];
                case 6:
                    e_5 = _b.sent();
                    console.log('e1 ' + e_5);
                    return [2 /*return*/, res.status(404).json({ message: 'algo anda mal 1', status: 404 })];
                case 7: return [3 /*break*/, 14];
                case 8:
                    _b.trys.push([8, 13, , 14]);
                    i = 0;
                    _b.label = 9;
                case 9:
                    if (!(i < idProd.length)) return [3 /*break*/, 12];
                    return [4 /*yield*/, prodRepo.find({
                            select: ['id', 'minExistencia', 'cantidad', 'descripcion', 'costo'],
                            where: { user: userId, id: idProd[i] }
                        })];
                case 10:
                    auxMin = _b.sent();
                    if (auxMin.length > 0) {
                        infoProd.push(auxMin[0]);
                    }
                    _b.label = 11;
                case 11:
                    i++;
                    return [3 /*break*/, 9];
                case 12: return [3 /*break*/, 14];
                case 13:
                    e_6 = _b.sent();
                    console.log('e2 ' + e_6);
                    return [2 /*return*/, res.status(404).json({ message: 'algo anda mal 2', status: 404 })];
                case 14:
                    //compruebo si hubo resultado
                    if (infoProd.length <= 0 || infoProd.length != idProd.length) {
                        return [2 /*return*/, res.status(404).json({ message: 'algo anda mal 3, compruebe los productos a vender', status: 404 })];
                    }
                    //compruebo si tengo disponible la cantidad que me solicitan y envio el primero que no concuerde
                    for (i = 0; i < infoProd.length; i++) {
                        if (infoProd[i].cantidad < cantidad[i]) {
                            return [2 /*return*/, res.status(404).json({ message: 'cantidad de ' + infoProd[i].descripcion + ' insuficientes', status: 404 })];
                        }
                    }
                    myQuery = typeorm_1.getManager();
                    ventaRepo = typeorm_1.getRepository(Venta_1.Venta);
                    venta = new Venta_1.Venta();
                    idVentaProd = [];
                    total = 0;
                    fecha = new Date();
                    _b.label = 15;
                case 15:
                    _b.trys.push([15, 34, , 35]);
                    //obtengo el total de la venta, aun no se aplican descuentos ni recargos
                    for (i = 0; i < idProd.length; i++) {
                        total = total + (cantidad[i] * infoProd[i].costo);
                    }
                    _b.label = 16;
                case 16:
                    _b.trys.push([16, 18, , 19]);
                    //guardo los datos en la tabla venta
                    venta.fechaVenta = fecha;
                    venta.total = total;
                    venta.user = userId;
                    return [4 /*yield*/, ventaRepo.save(venta)];
                case 17:
                    _b.sent();
                    return [3 /*break*/, 19];
                case 18:
                    e_7 = _b.sent();
                    console.log('e3: ' + e_7);
                    return [2 /*return*/, res.status(404).json({ message: 'no se pudo registrar la venta', status: 404 })];
                case 19: return [4 /*yield*/, myQuery.query("select max(id) as m from venta")];
                case 20:
                    /* obtengo el id de venta_producto, en teoria como recien agrege una venta, cuando busque el id maximo,
                    va a asociarse a este la relacion venta_producto */
                    idVentaProd = _b.sent();
                    idVentaProd = idVentaProd[0].m;
                    i = 0;
                    _b.label = 21;
                case 21:
                    if (!(i < idProd.length)) return [3 /*break*/, 24];
                    return [4 /*yield*/, myQuery.query("insert into venta_producto\n                    (productoId, ventaId, cantidad, totalParcial)\n                    values (" + idProd[i] + ", " + idVentaProd + ", " + cantidad[i] + ", " + infoProd[i].costo * cantidad[i] + ")\n                ")];
                case 22:
                    aux = _b.sent();
                    _b.label = 23;
                case 23:
                    i++;
                    return [3 /*break*/, 21];
                case 24:
                    if (!(parseInt(adminId) != 0)) return [3 /*break*/, 29];
                    i = 0;
                    _b.label = 25;
                case 25:
                    if (!(i < idProd.length)) return [3 /*break*/, 28];
                    return [4 /*yield*/, myQuery.query("update producto set \n                    producto.cantidad=" + (infoProd[i].cantidad - cantidad[i]) + "\n                    where producto.id=" + infoProd[i].id + " and producto.userId=" + adminId + "\n                    ")];
                case 26:
                    aux = _b.sent();
                    _b.label = 27;
                case 27:
                    i++;
                    return [3 /*break*/, 25];
                case 28: return [3 /*break*/, 33];
                case 29:
                    i = 0;
                    _b.label = 30;
                case 30:
                    if (!(i < idProd.length)) return [3 /*break*/, 33];
                    return [4 /*yield*/, myQuery.query("update producto set \n                    producto.cantidad=" + (infoProd[i].cantidad - cantidad[i]) + "\n                    where producto.id=" + infoProd[i].id + " and producto.userId=" + userId + "\n                    ")];
                case 31:
                    aux = _b.sent();
                    _b.label = 32;
                case 32:
                    i++;
                    return [3 /*break*/, 30];
                case 33: return [3 /*break*/, 35];
                case 34:
                    e_8 = _b.sent();
                    console.log('e: ' + e_8);
                    return [2 /*return*/, res.status(404).json({ message: 'algo anda mal 4', status: 404 })];
                case 35:
                    res.status(200).json({ message: 'se registro la venta con exito !!!', status: 200 });
                    return [2 /*return*/];
            }
        });
    }); };
    return VentaController;
}());
exports.VentaController = VentaController;
exports.default = VentaController;
//# sourceMappingURL=VentaController.js.map