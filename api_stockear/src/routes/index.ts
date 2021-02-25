import {Router} from 'express';
import auth from './auth';
import user from './user';
import medida from './medida';
import ingrediente from './ingrediente';
import categoria from './categoria';

const routes=Router();
routes.use('/auth',auth);
routes.use('/users',user);
routes.use('/medida',medida);
routes.use('/ingrediente',ingrediente);
routes.use('/categoria',categoria);
export default routes;