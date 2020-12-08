import { Router } from "express";
import {MedidaController} from '../controller/MedidaController'

const router=Router();
router.get('/',MedidaController.getAll);
router.patch('/:id',MedidaController.editMedida);
router.post('/',MedidaController.new);

export default router;