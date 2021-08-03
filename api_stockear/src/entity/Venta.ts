import { IsNotEmpty } from "class-validator";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Descuento } from "./Descuento";
import { Recargo } from "./Recargo";
import { User } from "./User";
import { VentaProducto } from "./VentaProducto";

@Entity()

export class Venta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'datetime' })
    fechaVenta: Date;

    @Column({ type: "float" })
    total: number;

    @ManyToOne(() => User, (user: User) => user.ventas)
    user: User;

    @OneToMany(() => VentaProducto, (ventaProducto: VentaProducto) => ventaProducto.venta)
    public ventaProducto!: VentaProducto[];

    @ManyToMany(() => Descuento, (descuento: Descuento) => descuento.ventas)
    descuentos: Descuento[];

    @ManyToMany(() => Recargo, (recargo: Recargo) => recargo.ventas)
    recargos: Recargo[];
}
