import { Router } from "express";
import { IngredienteController } from "../controller/IngredienteController";

const router=Router();
router.get('/',IngredienteController.getAll);
router.post('/',IngredienteController.newIngrediente);

export default router;