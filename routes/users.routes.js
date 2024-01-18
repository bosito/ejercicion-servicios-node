//Middlerware Enrutador (Router);
import { Router } from "express";
import { getUsers, getUserById, createUser } from "../controllers/users.controllers.js";

const routes = Router();

routes.get('/users', getUsers);
routes.get('/users/:id', getUserById);
routes.post('/users', createUser);
routes.put('/users/:id');
routes.delete('/users/:id');

export default routes;