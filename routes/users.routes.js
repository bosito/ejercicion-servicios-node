//Middlerware Enrutador (Router);
import { Router } from "express";
import { getUsers, getUserById } from "../controllers/users.controllers.js";

const routes = Router();

routes.get('/users', getUsers);
routes.get('/users/:id', getUserById);
routes.post('/users');
routes.put('/users/:id');
routes.delete('/users/:id');

export default routes;