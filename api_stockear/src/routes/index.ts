import { Router } from 'express';
import auth from './auth';
import user from './user';
import medida from './medida';
import ingrediente from './ingrediente';
import categoria from './categoria';
import descuento from './descuento';
import recargo from './recargo';
import producto from './producto';
import venta from './venta';
import negocio from './negocio'

const routes = Router();
routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/medida', medida);
routes.use('/ingrediente', ingrediente);
routes.use('/categoria', categoria);
routes.use('/descuento', descuento);
routes.use('/recargo', recargo);
routes.use('/producto', producto);
routes.use('/venta', venta);
routes.use('/negocio', negocio)

export default routes;