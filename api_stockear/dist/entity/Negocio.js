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
exports.Negocio = void 0;
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Negocio = /** @class */ (function () {
    function Negocio() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Negocio.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], Negocio.prototype, "nombre", void 0);
    __decorate([
        typeorm_1.Column({ default: null }),
        __metadata("design:type", String)
    ], Negocio.prototype, "descripcion", void 0);
    __decorate([
        typeorm_1.Column({ default: null }),
        __metadata("design:type", String)
    ], Negocio.prototype, "imagen", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], Negocio.prototype, "direccion", void 0);
    __decorate([
        typeorm_1.Column({ default: null }),
        __metadata("design:type", Number)
    ], Negocio.prototype, "telefono", void 0);
    __decorate([
        typeorm_1.Column({ default: null }),
        __metadata("design:type", String)
    ], Negocio.prototype, "correo", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return User_1.User; }, function (user) { return user.negocio; }, { nullable: true }),
        __metadata("design:type", Array)
    ], Negocio.prototype, "user", void 0);
    Negocio = __decorate([
        typeorm_1.Entity()
    ], Negocio);
    return Negocio;
}());
exports.Negocio = Negocio;
//# sourceMappingURL=Negocio.js.map