import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Venta } from "./Venta";

@Entity()
export class Recargo{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @IsNotEmpty()
    descripcion:string;

    @Column()
    @IsNotEmpty()
    monto:number;

    @Column()
    @IsNotEmpty()
    tipo:string;

    @ManyToOne(()=> User,(user:User)=>user.recargos)
    user:User;

    @ManyToMany(()=>Venta,(venta:Venta)=>venta.recargos)
    ventas:Venta[];
}