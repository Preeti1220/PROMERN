import express from "express";
const Router = express.Router();
import validate from '../middlewares/validate-middlewares.js';
import { signupSchema, loginSchema } from "../validators/auth-validator.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { home, register, Login, user } from '../controllers/auth-controllers.js'


Router.route('/').post(home);

Router.route('/register').post(validate(signupSchema), register);

Router.route('/login').post(validate(loginSchema), Login);

Router.route('/user').get(authMiddleware, user);


export default Router;