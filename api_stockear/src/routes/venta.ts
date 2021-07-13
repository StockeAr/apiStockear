import { Router } from 'express';
import { VentaController } from '../controller/VentaController';
import { chekRol } from '../middleware/rol';
import { checkJwt } from '../middleware/jwt';

const router = Router();
//Obtener todas las venta realizadas por el usuario logueado
router.get('/', [checkJwt], VentaController.getAll);

//obtener una venta del usuario logueado
router.get('/find/:id', [checkJwt], VentaController.getById);

//Obtener todas las ventas del empleado
router.get('/empleados', [checkJwt, chekRol(['admin'])], VentaController.getEmpleadosVentas);

//estadisticas
router.get('/estadisticas', [checkJwt, chekRol(['admin'])], VentaController.estadisticas)

//Crear una nueva venta
router.post('/', [checkJwt], VentaController.newVenta);


export default router;
