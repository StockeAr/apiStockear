import { IsNotEmpty, MinLength, IsEmail, isEmail, IsOptional } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import * as bcrypt from 'bcryptjs';
import {Producto} from './Producto';

@Entity()
@Unique(['username'])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(6)
    @IsEmail()
    @IsNotEmpty()
    username: string;

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

    @Column({type:'datetime'})
    //@CreateDateColumn()
    creado: Date;

    @Column({type:'datetime'})
    //@UpdateDateColumn()
    modificado: Date;

    @OneToMany(()=>Producto,(producto:Producto)=>producto.user)
    productos:Producto[];

    hashPassword(): void {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }

    checkPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password)
    }

}
