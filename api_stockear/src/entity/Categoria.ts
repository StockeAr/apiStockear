import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./Producto";
import { User } from "./User";

@Entity()
export class Categoria{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @IsNotEmpty()
    descripcion:string;

    @OneToMany(()=>Producto,(producto:Producto)=>producto.categoria)
    productos:Producto[];

    @ManyToOne(()=>User,(user:User)=>user.categorias)
    user:User;
}