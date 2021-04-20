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
exports.Descuento = void 0;
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Venta_1 = require("./Venta");
var Descuento = /** @class */ (function () {
    function Descuento() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Descuento.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], Descuento.prototype, "descripcion", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", Number)
    ], Descuento.prototype, "monto", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], Descuento.prototype, "tipo", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.descuentos; }),
        __metadata("design:type", User_1.User)
    ], Descuento.prototype, "user", void 0);
    __decorate([
        typeorm_1.ManyToMany(function () { return Venta_1.Venta; }, function (venta) { return venta.descuentos; }),
        __metadata("design:type", Array)
    ], Descuento.prototype, "ventas", void 0);
    Descuento = __decorate([
        typeorm_1.Entity()
    ], Descuento);
    return Descuento;
}());
exports.Descuento = Descuento;
//# sourceMappingURL=Descuento.js.map