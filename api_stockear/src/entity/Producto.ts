import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from './User';
import { Medida } from './Medida';
import { Categoria } from "./Categoria";
import { IsNotEmpty } from "class-validator";
import { VentaProducto } from "./VentaProducto";

@Entity()
export class Producto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    descripcion: string;

    @Column({ type: "float" })
    @IsNotEmpty()
    costo: number;

    @Column()
    @IsNotEmpty()
    minExistencia: number;

    @Column()
    @IsNotEmpty()
    cantidad: number;

    @Column({ type: 'datetime' })
    creado: Date;

    @Column({ type: 'datetime' })
    modificado: Date;

    @Column({ nullable: true, default: null })
    imagen: string;

    @ManyToOne(() => User, (user: User) => user.productos)
    user: User;

    @ManyToOne(() => Medida, (medida: Medida) => medida.productos, { nullable: true })
    //@IsNotEmpty()
    medida: Medida;

    @ManyToOne(() => Categoria, (categoria: Categoria) => categoria.productos)
    @IsNotEmpty()
    categoria: Categoria;

    @OneToMany(() => VentaProducto, (ventaProducto: VentaProducto) => ventaProducto.producto)
    public ventaProducto!: VentaProducto[];

}