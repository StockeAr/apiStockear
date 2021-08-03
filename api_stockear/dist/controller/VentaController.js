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
var VentaProducto_1 = require("../entity/VentaProducto");
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
                    return [2 /*return*/, res.status(404).json({ message: 'Algo anda mal' })];
                case 4:
                    if (venta.length > 0) {
                        return [2 /*return*/, res.send(venta)];
                    }
                    else {
                        return [2 /*return*/, res.status(404).json({ message: 'No hubo resultado' })];
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    //realizar un pequeño refactor
    VentaController.getById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, ventaProdRepo, ventaInfo, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    ventaProdRepo = typeorm_1.getRepository(VentaProducto_1.VentaProducto);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, ventaProdRepo
                            .createQueryBuilder("venta_producto")
                            .select([
                            "venta_producto.cantidad",
                            "venta_producto.precio",
                            "venta_producto.totalParcial",
                            "venta_producto.ventaId",
                            "producto.descripcion",
                            "medida.descripcion",
                            "categoria.descripcion"
                        ])
                            .leftJoin("venta_producto.producto", "producto")
                            .leftJoin("producto.medida", "medida")
                            .leftJoin("producto.categoria", "categoria")
                            .where("venta_producto.venta=:id", { id: id })
                            .getMany()];
                case 2:
                    /* ventaInfo = await myQuery.query(`select v_p.ventaId, p.descripcion as producto, c.descripcion as categoria,  p.costo, v_p.cantidad, v_p.totalParcial from venta_producto as v_p
                    inner join producto as p
                    on v_p.productoId=p.id
                    inner join categoria as c
                    on p.categoriaId=c.id
                    where v_p.ventaId=${id}`); */
                    ventaInfo = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    console.log("e: ", e_2);
                    return [2 /*return*/, res.status(404).json({ message: 'algo anda mal' })];
                case 4:
                    if (ventaInfo.length > 0) {
                        return [2 /*return*/, res.status(200).json(ventaInfo)];
                    }
                    else {
                        return [2 /*return*/, res.status(404).json({ message: 'no hubo resultado' })];
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    VentaController.getEmpleadosVentas = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, ventaRepo, venta, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = res.locals.jwtPayload.userId;
                    ventaRepo = typeorm_1.getRepository(Venta_1.Venta);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, ventaRepo
                            .createQueryBuilder("venta")
                            .select([
                            "venta.fechaVenta",
                            "venta.total",
                            "venta.id",
                            "user.username",
                            "user.nombre",
                            "user.apellido",
                            "user.id",
                            "venta_producto.cantidad",
                            "venta_producto.totalParcial",
                            "venta_producto.precio",
                            "venta_producto.ventaId",
                            "producto.descripcion",
                            "medida.descripcion",
                            "categoria.descripcion",
                        ])
                            .leftJoin("venta.user", "user")
                            .leftJoin("venta.ventaProducto", "venta_producto")
                            .leftJoin("venta_producto.producto", "producto")
                            .leftJoin("producto.medida", "medida")
                            .leftJoin("producto.categoria", "categoria")
                            .orderBy("venta.fechaVenta", "DESC")
                            .where("user.adminId=:id", { id: userId })
                            .getMany()];
                case 2:
                    venta = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    console.log("e: ", e_3);
                    return [2 /*return*/, res.status(404).json({ message: "algo salio mal" })];
                case 4: return [2 /*return*/, res.json(venta)];
            }
        });
    }); };
    VentaController.estadisticas = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, userId, negocioId, userRepo, prodRepo, user, e_4, prod, e_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = res.locals.jwtPayload, userId = _a.userId, negocioId = _a.negocioId;
                    userRepo = typeorm_1.getRepository(User_1.User);
                    prodRepo = typeorm_1.getRepository(Producto_1.Producto);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepo
                            .createQueryBuilder("user")
                            .select("CONCAT(user.nombre,' ',user.apellido)", "name")
                            .addSelect("SUM(venta.total)", "value")
                            .leftJoin("user.ventas", "venta")
                            .where("user.negocio=:id", { id: negocioId })
                            .groupBy("user.id")
                            .getRawMany()];
                case 2:
                    user = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _b.sent();
                    console.log("e: ", e_4);
                    return [2 /*return*/, res.status(404).json({ message: "algo anda mal" })];
                case 4:
                    _b.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, prodRepo
                            .createQueryBuilder("producto")
                            .select("COUNT(venta_producto.producto)", "value")
                            .addSelect("producto.descripcion", "name")
                            .leftJoin("producto.ventaProducto", "venta_producto")
                            .leftJoin("producto.user", "user")
                            .where("user.negocio=:id", { id: negocioId })
                            .groupBy("producto.id")
                            .getRawMany()];
                case 5:
                    prod = _b.sent();
                    return [3 /*break*/, 7];
                case 6:
                    e_5 = _b.sent();
                    console.log("e: ", e_5);
                    return [2 /*return*/, res.status(404).json({ message: "algo anda mal" })];
                case 7: 
                /* let producto;
                const ventaRepo = getRepository(Producto);
                try {
                    producto = await ventaRepo
                        .createQueryBuilder("producto")
                        .select([
                            "venta.id",
                            "venta_producto.cantidad",
                            "producto.descripcion",
                            "user.id",
                            "user.nombre",
                            "user.apellido"
                        ])
                        .leftJoin("producto.ventaProducto", "venta_producto")
                        .leftJoin("venta_producto.venta", "venta")
                        .leftJoin("venta.user", "user")
                        .where("user.adminId=:id", { id: userId })
                        .getMany();
                } catch (e) {
                    console.log("e: ", e);
                    return res.status(404).json({ message: "algo salio mal" })
                } */
                //console.log(producto);
                //res.send({ producto, user, aux, venta })
                return [2 /*return*/, res.status(200).json({ prod: prod, user: user })];
            }
        });
    }); };
    VentaController.newVenta = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, userId, adminId, _b, idProd, cantidad, prodRepo, infoProd, id, i, aux, e_6, i, aux, ventaRepo, fecha, insert, total, i, e_7, ventaProdRepo, i, aux, e_8, e_9, i, aux, e_10;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = res.locals.jwtPayload, userId = _a.userId, adminId = _a.adminId;
                    _b = req.body, idProd = _b.idProd, cantidad = _b.cantidad;
                    //compruebo si el tamaño de las cantidades es igual al tamaño de los id de productos
                    if ((idProd.length == 0) || (cantidad.length == 0)) {
                        return [2 /*return*/, res.status(404).json({ message: 'no envio nada' })];
                    }
                    if (idProd.length != cantidad.length) {
                        return [2 /*return*/, res.status(404).json({ message: 'La cantidad de productos no coincide con la cantidad a vender de cada uno' })];
                    }
                    prodRepo = typeorm_1.getRepository(Producto_1.Producto);
                    infoProd = [];
                    if (adminId == 0) {
                        id = userId;
                    }
                    else {
                        id = adminId;
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 6, , 7]);
                    i = 0;
                    _c.label = 2;
                case 2:
                    if (!(i < idProd.length)) return [3 /*break*/, 5];
                    aux = null;
                    return [4 /*yield*/, prodRepo.findOneOrFail(idProd[i], {
                            select: ['id', 'minExistencia', 'cantidad', 'descripcion', 'costo'],
                            where: [{ user: id }],
                            relations: ['medida']
                        })];
                case 3:
                    aux = _c.sent();
                    infoProd.push(aux);
                    _c.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5:
                    if ((idProd.length != infoProd.length) && (infoProd.length <= 0)) {
                        return [2 /*return*/, res.status(404).json({ message: "envie nuevamente los productos a vender" })];
                    }
                    return [3 /*break*/, 7];
                case 6:
                    e_6 = _c.sent();
                    console.log("e: ", e_6);
                    return [2 /*return*/, res.status(404).json({ message: "algo anda mal 1" })];
                case 7:
                    //compruebo si tengo disponible la cantidad que me solicitan y envio el primero que no concuerde
                    for (i = 0; i < infoProd.length; i++) {
                        aux = infoProd[i].cantidad - cantidad[i];
                        if (aux < 0) {
                            return [2 /*return*/, res.status(404).json({ message: 'cantidad de ' + infoProd[i].descripcion + ' insuficientes', status: 404 })];
                        }
                    }
                    ventaRepo = typeorm_1.getRepository(Venta_1.Venta);
                    fecha = new Date();
                    insert = null;
                    total = 0;
                    //calculo el total de la venta
                    for (i = 0; i < infoProd.length; i++) {
                        if (infoProd[i].medida != null) {
                            total += infoProd[i].costo * cantidad[i];
                        }
                        else {
                            total += infoProd[i].costo * Math.trunc(cantidad[i]);
                        }
                    }
                    _c.label = 8;
                case 8:
                    _c.trys.push([8, 10, , 11]);
                    return [4 /*yield*/, ventaRepo
                            .createQueryBuilder()
                            .insert()
                            .into(Venta_1.Venta)
                            .values([{
                                total: total,
                                user: userId,
                                fechaVenta: fecha
                            }])
                            .execute()];
                case 9:
                    insert = _c.sent();
                    return [3 /*break*/, 11];
                case 10:
                    e_7 = _c.sent();
                    console.log("e: ", e_7);
                    return [2 /*return*/, res.status(404).json({ message: "no se pudo realizar la venta 1" })];
                case 11:
                    ventaProdRepo = typeorm_1.getRepository(VentaProducto_1.VentaProducto);
                    _c.label = 12;
                case 12:
                    _c.trys.push([12, 17, , 22]);
                    i = 0;
                    _c.label = 13;
                case 13:
                    if (!(i < infoProd.length)) return [3 /*break*/, 16];
                    aux = 0;
                    if (infoProd[i].medida != null) {
                        aux = cantidad[i];
                    }
                    else {
                        aux = Math.trunc(cantidad[i]);
                    }
                    return [4 /*yield*/, ventaProdRepo
                            .createQueryBuilder()
                            .insert()
                            .into(VentaProducto_1.VentaProducto)
                            .values([{
                                cantidad: aux,
                                precio: infoProd[i].costo,
                                totalParcial: (aux * infoProd[i].costo),
                                ventaId: insert.raw.insertId,
                                productoId: infoProd[i].id
                            }])
                            .execute()];
                case 14:
                    _c.sent();
                    aux = 0;
                    _c.label = 15;
                case 15:
                    i++;
                    return [3 /*break*/, 13];
                case 16: return [3 /*break*/, 22];
                case 17:
                    e_8 = _c.sent();
                    console.log("e: ", e_8);
                    _c.label = 18;
                case 18:
                    _c.trys.push([18, 20, , 21]);
                    return [4 /*yield*/, ventaRepo
                            .createQueryBuilder()
                            .delete()
                            .from(Venta_1.Venta)
                            .where("id=:id", { id: insert.raw.insertId })
                            .execute()];
                case 19:
                    _c.sent();
                    return [3 /*break*/, 21];
                case 20:
                    e_9 = _c.sent();
                    console.log("e: ", e_9);
                    return [2 /*return*/, res.status(404).json({ message: "algo anda mal 2" })];
                case 21: return [2 /*return*/, res.status(404).json({ message: "no se pudo realizar la venta 2" })];
                case 22:
                    _c.trys.push([22, 27, , 28]);
                    i = 0;
                    _c.label = 23;
                case 23:
                    if (!(i < infoProd.length)) return [3 /*break*/, 26];
                    aux = 0;
                    if (infoProd[i].medida != null) {
                        aux = cantidad[i];
                    }
                    else {
                        aux = Math.trunc(cantidad[i]);
                    }
                    return [4 /*yield*/, prodRepo
                            .createQueryBuilder()
                            .update(Producto_1.Producto)
                            .set({
                            cantidad: (infoProd[i].cantidad - aux)
                        })
                            .where("id=:id", { id: infoProd[i].id })
                            .andWhere("user=:user", { user: id })
                            .execute()];
                case 24:
                    _c.sent();
                    aux = 0;
                    _c.label = 25;
                case 25:
                    i++;
                    return [3 /*break*/, 23];
                case 26: return [3 /*break*/, 28];
                case 27:
                    e_10 = _c.sent();
                    console.log("e: ", e_10);
                    return [2 /*return*/, res.status(404).json({ message: "no se pudo actualizar los productos" })];
                case 28: 
                //esto es viejo y funciona
                /* const myQuery = getManager();
                const ventaRepo = getRepository(Venta);
                const venta = new Venta();
                let idVentaProd = [];
                let aux;
                let total: number = 0;
                const fecha = new Date(); */
                /*  try {
                     //obtengo el total de la venta, aun no se aplican descuentos ni recargos
                     for (let i = 0; i < idProd.length; i++) {
                         total = total + (cantidad[i] * infoProd[i].costo);
                     }
         
                     try {
                         //guardo los datos en la tabla venta
                         venta.fechaVenta = fecha;
                         venta.total = total;
                         venta.user = userId;
                         await ventaRepo.save(venta);
         
                     } catch (e) {
                         console.log('e3: ' + e);
                         return res.status(404).json({ message: 'no se pudo registrar la venta', status: 404 });
                     }
         
                     //obtengo el id de venta_producto, en teoria como recien agrege una venta, cuando busque el id maximo,
                     //va a asociarse a este la relacion venta_producto
                     idVentaProd = await myQuery.query(`select max(id) as m from venta`);
                     idVentaProd = idVentaProd[0].m;
                     //console.log(idVentaProd);
         
                     //guardo en la relacion venta_producto; //tengo del body idProd[] y cantidad[]
                     for (let i = 0; i < idProd.length; i++) {
                         aux = await myQuery.query(`insert into venta_producto
                             (productoId, ventaId, cantidad, totalParcial)
                             values (${idProd[i]}, ${idVentaProd}, ${cantidad[i]}, ${infoProd[i].costo * cantidad[i]})
                         `);
                     }
         
                     //realizo una actualizacion de las cantidades de los productos vendidos distinguiendo el rol
                     if (parseInt(adminId) != 0) {
                         for (let i = 0; i < idProd.length; i++) {
                             aux = await myQuery.query(`update producto set
                             producto.cantidad=${infoProd[i].cantidad - cantidad[i]}
                             where producto.id=${infoProd[i].id} and producto.userId=${adminId}
                             `)
                         }
                     } else {
                         for (let i = 0; i < idProd.length; i++) {
                             aux = await myQuery.query(`update producto set
                             producto.cantidad=${infoProd[i].cantidad - cantidad[i]}
                             where producto.id=${infoProd[i].id} and producto.userId=${userId}
                             `)
                         }
                     }
         
                 } catch (e) {
                     console.log('e: ' + e);
                     return res.status(404).json({ message: 'algo anda mal 4', status: 404 });
                 } */
                return [2 /*return*/, res.status(200).json({ message: 'se registro la venta con exito !!!', status: 200 })];
            }
        });
    }); };
    return VentaController;
}());
exports.VentaController = VentaController;
exports.default = VentaController;
//# sourceMappingURL=VentaController.js.map