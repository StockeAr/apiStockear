import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {Ingrediente} from './Ingrediente';
@Entity()
export class Medida{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @IsNotEmpty()
    nombre:string;

    @OneToMany(()=>Ingrediente,(ingrediente:Ingrediente)=>ingrediente.medida)
    ingredientes:Ingrediente[];
}