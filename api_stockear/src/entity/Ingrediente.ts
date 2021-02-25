import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {Medida} from './Medida';

@Entity()
export class Ingrediente{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:true})
    nombre:string;

    @Column()
    cantidad:number;
}