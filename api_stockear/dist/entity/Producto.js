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
exports.Producto = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Ingrediente_1 = require("./Ingrediente");
var Producto = /** @class */ (function () {
    function Producto() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Producto.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Producto.prototype, "descripcion", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.productos; }),
        __metadata("design:type", User_1.User)
    ], Producto.prototype, "user", void 0);
    __decorate([
        typeorm_1.ManyToMany(function () { return Ingrediente_1.Ingrediente; }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], Producto.prototype, "ingredientes", void 0);
    Producto = __decorate([
        typeorm_1.Entity()
    ], Producto);
    return Producto;
}());
exports.Producto = Producto;
//# sourceMappingURL=Producto.js.map