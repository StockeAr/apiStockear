import {Router} from 'express';
import auth from './auth';
import user from './user';
import medida from './medida';
import ingrediente from './ingrediente';
import categoria from './categoria';
import descuento from './descuento';
import recargo from './recargo'

const routes=Router();
routes.use('/auth',auth);
routes.use('/users',user);
routes.use('/medida',medida);
routes.use('/ingrediente',ingrediente);
routes.use('/categoria',categoria);
routes.use('/descuento',descuento);
routes.use('/recargo',recargo);
export default routes;