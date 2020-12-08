import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { Medida } from "../entity/Medida"
export class MedidaController {

    static getAll = async (req: Request, res: Response) => {
        const medidaRepo = getRepository(Medida);
        let medida;
        try {
            medida = await medidaRepo.find();
        } catch (e) {
            res.status(404).json({ message: 'Algo anda mal' });
        }
        res.send(medida);
    }

    static new = async (req: Request, res: Response) => {
        const { nombre } = req.body;
        const medida = new Medida();
        medida.nombre = nombre;
        const medidaRepo = getRepository(Medida);
        try {
            await medidaRepo.save(medida);
        } catch (e) {
            return res.status(404).json({ message: 'algo salio mal' });
        }
        res.send('Medida agregada');
    }
    static editMedida = async (req: Request, res: Response) => {
        let medida;
        const {id}=req.params;
        const {nombre}=req.body;
        const medidaRepo = getRepository(Medida);
        try {
            medida= await medidaRepo.findOneOrFail(id);
            medida.nombre=nombre;
        } catch (e) {
            return res.status(404).json({ message: 'Medida no encontrada' });
        }
        try {
            await medidaRepo.save(medida);
        }
        catch (e) {
            return res.status(409).json({ message: 'El nombre de la medida ya esta en uso' })
        }
        res.status(201).json({message:'Medida editada'});
    }
}