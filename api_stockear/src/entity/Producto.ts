import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {User} from './User';
import {Ingrediente} from './Ingrediente';

@Entity()
export class Producto{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    descripcion:string;

    @ManyToOne(() => User,(user:User)=>user.productos)
    user:User;

    @ManyToMany(()=>Ingrediente)
    @JoinTable()
    ingredientes:Ingrediente[];
}