import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Medida } from "../entity/Medida";
import { User } from "../entity/User";
export class MedidaController {

    static getAll = async (req: Request, res: Response) => {
        const { userId } = res.locals.jwtPayload;
        const medidaRepo = getRepository(Medida);
        let medida;
        try {
            medida = await medidaRepo.find({
                where: { user: userId }
            });
        } catch (e) {
            res.status(404).json({ message: 'Algo anda mal' });
        }

        if (medida.length > 0) {
            res.send(medida);
        } else {
            res.status(404).json({ message: 'No hubo resultado' });
        }
    }

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { userId } = res.locals.jwtPayload;

        const medidaRepo = getRepository(Medida);
        let medida;
        try {
            medida = await medidaRepo.findOneOrFail(id, {
                select: ['id', 'descripcion'],
                where: { user: userId }
            });
            res.send(medida);
        } catch (error) {
            res.status(404).json({ message: 'No hubo resultado' });
        }
    };

    static newMedida = async (req: Request, res: Response) => {
        const { descripcion } = req.body;
        const { userId } = res.locals.jwtPayload;

        const medida = new Medida();
        medida.descripcion = descripcion;
        //medida.user = userId;

        const opcionesValidacion = { validationError: { target: false, value: false } };
        const errors = await validate(medida, opcionesValidacion);
        if (errors.length > 0) {
            return res.status(404).json(errors);
        }

        const medidaRepo = getRepository(Medida);
        try {
            await medidaRepo.save(medida);
        } catch (e) {
            console.log(e);
            return res.status(404).json({ message: 'algo salio mal' });
        }
        res.status(201).json({ message: 'Medida Agregada' });
    }
    static editMedida = async (req: Request, res: Response) => {
        let medida;
        const { id } = req.params;
        const { descripcion } = req.body;
        const { userId } = res.locals.jwtPayload;

        const medidaRepo = getRepository(Medida);
        try {
            medida = await medidaRepo.findOneOrFail(id, {
                where: { user: userId }
            });
            medida.descripcion = descripcion;
        } catch (e) {
            return res.status(404).json({ message: 'Medida no encontrada' });
        }

        const opcionesValidacion = { validationError: { target: false, value: false } };
        const errors = await validate(medida, opcionesValidacion);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        try {
            await medidaRepo.save(medida);
        }
        catch (e) {
            return res.status(409).json({ message: 'El nombre de la medida ya esta en uso' })
        }
        res.status(201).json({ message: 'Medida editada' });
    }

    static deleteMedida = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { adminId } = res.locals.jwtPayload;

        const medidaRepo = getRepository(Medida);
        let medida;
        try {
            medida = await medidaRepo.find({
                where: { user: adminId, id: id }
            });
        }
        catch (err) {
            console.log(err);
            return res.status(404).json({ message: 'Medida no encontrada' });
        }

        //eliminando medida para
        medidaRepo.delete(id);
        res.status(201).json({ message: 'Medida eliminada' });
    }

    static info = async (req: Request, res: Response) => {
        const medidaRepo = getRepository(Medida);
        let medida;


        const userRepo = getRepository(User);
        let users;
        

        try {
            //medida = await medidaRepo.find({ relations: ['ingredientes'] });

            /* medida = await medidaRepo.createQueryBuilder("medida")
                .innerJoinAndSelect("medida.ingredientes", "ingrediente")
                .getMany(); */
            //ambas funciones realizan el mismo trabajo.


            /* medida = await medidaRepo
                .createQueryBuilder()
                .select("medida.id,medida.nombre")
                .addSelect("CONCAT(medida.id,medida.nombre)", "calc")
                .getRawMany(); */
            //para mas informacion consultar documentacion de typeorm->select query builder->Getting values using querybuilder

            /* users=await userRepo.find({
                select: ['id', 'username','rol'],
                join: {
                    alias: 'user',
                    innerJoinAndSelect: {
                        medida: 'user.medidas',
                        categoria:'user.categorias',
                        recargo: 'user.recargos',
                        descuento: 'user.descuentos',
                    }
                },
            }); */

            users=await userRepo.find({relations:['medidas','categorias','descuentos','recargos']});


        } catch (e) {
            console.log(e);
            res.status(404).json({ message: 'algo anda mal >:v' })
        }
        res.send(users);
    }

    static order = async (req: Request, res: Response) => {
        const { orderBy } = req.body;
        const medidaRepo = getRepository(Medida);
        let medida;
        try {
            console.log("esto me llego: " + orderBy);
            if (orderBy) {
                if (orderBy == 'ASC') {
                    medida = await medidaRepo.find({ order: { descripcion: 'ASC' } });
                } else {
                    if (orderBy == 'DESC') {
                        medida = await medidaRepo.find({ order: { descripcion: 'DESC' } });
                    } else {
                        medida = await medidaRepo.find();
                    }
                }
            } else {
                console.log("no mando orderBY");
                medida = await medidaRepo.find();
            }
        } catch (e) {
            res.status(404).json({ message: 'Algo anda mal' });
        }
        res.send(medida);
    }
}
export default MedidaController;