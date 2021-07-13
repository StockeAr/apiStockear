import { IsNotEmpty, MinLength } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./Producto";
import { User } from "./User";
@Entity()
export class Medida {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(1)
    @IsNotEmpty()
    descripcion: string;

    @OneToMany(() => Producto, (producto: Producto) => producto.medida, { nullable: true })
    productos: Producto[];

    @ManyToOne(() => User, (user: User) => user.medidas)
    user: User;
}