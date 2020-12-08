import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Ingrediente } from "../entity/Ingrediente";

export class IngredienteController{
    static getAll=async (req:Request,res:Response)=>{
        const ingredienteRepo=getRepository(Ingrediente);
        let ingrediente;
        try{
            ingrediente=await ingredienteRepo.find();
        }catch(e){
            res.status(404).json({message:'algo anda mal'});
        }
        if(ingrediente.length>0){
            res.send(ingrediente);
        }else{
            res.status(404).json({message:'No hubo resultado'});
        }
    }
    static newIngrediente=async(req:Request,res:Response)=>{
        const {nombre,cantidad,medidaID}=req.body;
        const ingrediente=new Ingrediente();
        ingrediente.nombre=nombre;
        ingrediente.cantidad=cantidad;
        ingrediente.medida=medidaID;
        const ingredienteRepo=getRepository(Ingrediente);
        try{
            await ingredienteRepo.save(ingrediente);
        }catch{
            return res.status(409).json({message:'El ingrediente existe'});
        }
        res.send('Ingrediente Creado');
    }
}