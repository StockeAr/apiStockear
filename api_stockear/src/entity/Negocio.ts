import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity()

export class Negocio {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    nombre: string;

    @Column({ default: null })
    descripcion: string;

    @Column({ default: null })
    imagen: string;

    @Column()
    @IsNotEmpty()
    direccion: string;

    @Column({ default: null })
    //@IsNotEmpty()
    //@IsPhoneNumber('AR')
    telefono: number;

    @Column({ default: null })
    //@IsNotEmpty()
    //@IsEmail()
    correo: string;

    @OneToMany(() => User, (user: User) => user.negocio)
    user: User[];
}