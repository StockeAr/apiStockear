import {  Router } from 'express';
import { VentaController } from '../controller/VentaController';
import { chekRol} from '../middleware/rol';
import { checkJwt } from '../middleware/jwt';

const router = Router();
//Obtener todas las venta
//router.get('/',[checkJwt], VentaController.getAll);
router.get('/', VentaController.getAll);

//Obtener todas las ventas del empleado
router.get('/empleados', [checkJwt, chekRol(['admin'])], VentaController.getEmpleadosVentas);

//Crear una nueva venta
router.post('/', [checkJwt], VentaController.newVenta);


export default router;
