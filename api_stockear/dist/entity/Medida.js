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
exports.Medida = void 0;
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var Producto_1 = require("./Producto");
var User_1 = require("./User");
var Medida = /** @class */ (function () {
    function Medida() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Medida.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.MinLength(1),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], Medida.prototype, "descripcion", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Producto_1.Producto; }, function (producto) { return producto.medida; }, { nullable: true }),
        __metadata("design:type", Array)
    ], Medida.prototype, "productos", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.medidas; }),
        __metadata("design:type", User_1.User)
    ], Medida.prototype, "user", void 0);
    Medida = __decorate([
        typeorm_1.Entity()
    ], Medida);
    return Medida;
}());
exports.Medida = Medida;
//# sourceMappingURL=Medida.js.map