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
exports.VentaProducto = void 0;
var typeorm_1 = require("typeorm");
var Producto_1 = require("./Producto");
var Venta_1 = require("./Venta");
var VentaProducto = /** @class */ (function () {
    function VentaProducto() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], VentaProducto.prototype, "ventaProducto", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], VentaProducto.prototype, "productoId", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], VentaProducto.prototype, "ventaId", void 0);
    __decorate([
        typeorm_1.Column({ type: "float" }),
        __metadata("design:type", Number)
    ], VentaProducto.prototype, "cantidad", void 0);
    __decorate([
        typeorm_1.Column({ type: "float" }),
        __metadata("design:type", Number)
    ], VentaProducto.prototype, "precio", void 0);
    __decorate([
        typeorm_1.Column({ type: "float" }),
        __metadata("design:type", Number)
    ], VentaProducto.prototype, "totalParcial", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Venta_1.Venta; }, function (venta) { return venta.ventaProducto; }),
        __metadata("design:type", Venta_1.Venta)
    ], VentaProducto.prototype, "venta", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Producto_1.Producto; }, function (producto) { return producto.ventaProducto; }),
        __metadata("design:type", Producto_1.Producto)
    ], VentaProducto.prototype, "producto", void 0);
    VentaProducto = __decorate([
        typeorm_1.Entity()
    ], VentaProducto);
    return VentaProducto;
}());
exports.VentaProducto = VentaProducto;
//# sourceMappingURL=VentaProducto.js.map