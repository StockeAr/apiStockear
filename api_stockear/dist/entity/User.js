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
exports.User = void 0;
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var bcrypt = require("bcryptjs");
var Producto_1 = require("./Producto");
var Medida_1 = require("./Medida");
var Categoria_1 = require("./Categoria");
var Venta_1 = require("./Venta");
var Descuento_1 = require("./Descuento");
var Recargo_1 = require("./Recargo");
var Negocio_1 = require("./Negocio");
var User = /** @class */ (function () {
    //@Unique(['username'])
    function User() {
    }
    User.prototype.hashPassword = function () {
        var salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    };
    User.prototype.checkPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ unique: true }),
        class_validator_1.MinLength(6),
        class_validator_1.IsEmail(),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], User.prototype, "username", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.MinLength(3),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], User.prototype, "nombre", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.MinLength(3),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], User.prototype, "apellido", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.IsNotEmpty(),
        class_validator_1.MinLength(8),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        typeorm_1.Column({ default: null }),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], User.prototype, "resetToken", void 0);
    __decorate([
        typeorm_1.Column({ default: null }),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], User.prototype, "refreshToken", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], User.prototype, "rol", void 0);
    __decorate([
        typeorm_1.Column({ type: 'boolean', default: true }),
        __metadata("design:type", Boolean)
    ], User.prototype, "activo", void 0);
    __decorate([
        typeorm_1.Column({ type: 'datetime' }),
        __metadata("design:type", Date)
    ], User.prototype, "creado", void 0);
    __decorate([
        typeorm_1.Column({ type: 'datetime' }),
        __metadata("design:type", Date)
    ], User.prototype, "modificado", void 0);
    __decorate([
        typeorm_1.Column({ default: 0 }),
        __metadata("design:type", Number)
    ], User.prototype, "adminId", void 0);
    __decorate([
        typeorm_1.Column({ default: null }),
        __metadata("design:type", String)
    ], User.prototype, "imagen", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Producto_1.Producto; }, function (producto) { return producto.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "productos", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Categoria_1.Categoria; }, function (categoria) { return categoria.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "categorias", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Medida_1.Medida; }, function (medida) { return medida.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "medidas", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Venta_1.Venta; }, function (venta) { return venta.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "ventas", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Descuento_1.Descuento; }, function (descuento) { return descuento.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "descuentos", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Recargo_1.Recargo; }, function (recargo) { return recargo.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "recargos", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Negocio_1.Negocio; }, function (negocio) { return negocio.user; }, { nullable: true }),
        __metadata("design:type", Negocio_1.Negocio)
    ], User.prototype, "negocio", void 0);
    User = __decorate([
        typeorm_1.Entity()
        //@Unique(['username'])
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map