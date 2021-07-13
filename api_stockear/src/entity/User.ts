import { IsNotEmpty, MinLength, IsEmail, isEmail, IsOptional } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, ManyToOne } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Producto } from './Producto';
import { Medida } from "./Medida";
import { Categoria } from "./Categoria";
import { Venta } from "./Venta";
import { Descuento } from "./Descuento";
import { Recargo } from "./Recargo";
import { Negocio } from "./Negocio";

@Entity()
@Unique(['username'])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @MinLength(6)
    @IsEmail()
    @IsNotEmpty()
    username: string;

    @Column()
    @MinLength(3)
    @IsNotEmpty()
    nombre: string;

    @Column()
    @MinLength(3)
    @IsNotEmpty()
    apellido: string;

    @Column()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @Column()
    @IsOptional()
    @IsNotEmpty()
    resetToken: string;

    @Column()
    @IsOptional()
    @IsNotEmpty()
    refreshToken: string;

    @Column()
    @IsNotEmpty()
    rol: string;

    @Column({ type: 'datetime' })
    //@CreateDateColumn()
    creado: Date;

    @Column({ type: 'datetime' })
    //@UpdateDateColumn()
    modificado: Date;

    @Column({ default: 0 })
    adminId: number;

    @Column({ default: null })
    imagen: string;

    @OneToMany(() => Producto, (producto: Producto) => producto.user)
    productos: Producto[];

    @OneToMany(() => Categoria, (categoria: Categoria) => categoria.user)
    categorias: Categoria[];

    @OneToMany(() => Medida, (medida: Medida) => medida.user)
    medidas: Medida[];

    @OneToMany(() => Venta, (venta: Venta) => venta.user)
    ventas: Venta[];

    @OneToMany(() => Descuento, (descuento: Descuento) => descuento.user)
    descuentos: Descuento[];

    @OneToMany(() => Recargo, (recargo: Recargo) => recargo.user)
    recargos: Recargo[];

    @ManyToOne(() => Negocio, (negocio: Negocio) => negocio.user, { nullable: true })
    negocio: Negocio;

    hashPassword(): void {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }

    checkPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password)
    }
}
