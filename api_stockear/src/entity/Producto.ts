import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {User} from './User';
import {Medida} from './Medida';
import { Categoria } from "./Categoria";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Producto{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @IsNotEmpty()
    descripcion:string;

    @Column()
    @IsNotEmpty()
    costo:number;

    @Column()
    @IsNotEmpty()
    minExistencia:number;

    @Column()
    @IsNotEmpty()
    cantidad:number;

    @Column({ type: 'datetime'})
    creado:Date;

    @Column({ type: 'datetime'})
    modificado:Date;

    @ManyToOne(() => User,(user:User)=>user.productos)
    user:User;

    /* @ManyToOne(() =>Medida,(medida:Medida)=>medida.productos)
    @IsNotEmpty()
    medida:Medida; */

    @ManyToOne(() =>Categoria,(categoria:Categoria)=>categoria.productos)
    @IsNotEmpty()
    categoria:Categoria;

}