import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./Producto";
import { Venta } from "./Venta";

@Entity()
export class VentaProducto {

  /* ignorar esta columna de la tabla venta_producto, pues el ORM no permite crear entidades sin Primary Key, esta de relleno*/
  @PrimaryGeneratedColumn()
  public ventaProducto!: number;

  @Column()
  public productoId!: number;

  @Column()
  public ventaId!: number;

  @Column({ type: "float" })
  public cantidad!: number;

  @Column({ type: "float" })
  public precio!: number;

  @Column({ type: "float" })
  public totalParcial!: number;

  @ManyToOne(() => Venta, (venta: Venta) => venta.ventaProducto)
  public venta!: Venta;

  @ManyToOne(() => Producto, (producto: Producto) => producto.ventaProducto)
  public producto!: Producto;
}