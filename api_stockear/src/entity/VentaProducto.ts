import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./Producto";
import { Venta } from "./Venta";

  @Entity()
  export class VentaProducto{
      @PrimaryGeneratedColumn()
      public ventaProducto!:number;

      @Column()
      public productoId!:number;

      @Column()
      public ventaId!:number;

      @Column()
      public cantidad!:number;

      @Column()
      public totalParcial!:number;

      @ManyToOne(()=>Venta,(venta:Venta)=>venta.ventaProducto)
      public venta!:Venta;

      @ManyToOne(()=>Producto,(producto:Producto)=>producto.ventaProducto)
      public producto!:Producto;
  }