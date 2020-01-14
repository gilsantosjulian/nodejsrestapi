import { Router } from 'express';
import * as userController from './user.controllers';
import validate from 'express-validation';
import userValidation from './user.validations';

const routes = new Router();
routes.post('/signup', validate(userValidation.signup), userController.signUp);
export default routes;
