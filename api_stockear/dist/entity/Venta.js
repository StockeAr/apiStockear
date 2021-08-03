"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venta = void 0;
var typeorm_1 = require("typeorm");
var Descuento_1 = require("./Descuento");
var Recargo_1 = require("./Recargo");
var User_1 = require("./User");
var VentaProducto_1 = require("./VentaProducto");
var Venta = /** @class */ (function () {
    function Venta() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Venta.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'datetime' }),
        __metadata("design:type", Date)
    ], Venta.prototype, "fechaVenta", void 0);
    __decorate([
        typeorm_1.Column({ type: "float" }),
        __metadata("design:type", Number)
    ], Venta.prototype, "total", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.ventas; }),
        __metadata("design:type", User_1.User)
    ], Venta.prototype, "user", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return VentaProducto_1.VentaProducto; }, function (ventaProducto) { return ventaProducto.venta; }),
        __metadata("design:type", Array)
    ], Venta.prototype, "ventaProducto", void 0);
    __decorate([
        typeorm_1.ManyToMany(function () { return Descuento_1.Descuento; }, function (descuento) { return descuento.ventas; }),
        __metadata("design:type", Array)
    ], Venta.prototype, "descuentos", void 0);
    __decorate([
        typeorm_1.ManyToMany(function () { return Recargo_1.Recargo; }, function (recargo) { return recargo.ventas; }),
        __metadata("design:type", Array)
    ], Venta.prototype, "recargos", void 0);
    Venta = __decorate([
        typeorm_1.Entity()
    ], Venta);
    return Venta;
}());
exports.Venta = Venta;
//# sourceMappingURL=Venta.js.map