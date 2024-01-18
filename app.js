import express from "express";
import userRoute from "./routes/users.routes.js";
import { handleerror } from "./middlewares/error.middleware.js";
//configuracion para guardar las peticiones en un archivo log
import morgan from "morgan";
import fs from "fs";
import path from "path";

const app = express(); // <- esto no es parte de la configuracion de logs

app.use(express.json()); // <- esto no es parte de la configuracion de logs

const accessLogStream = fs.createWriteStream(path.resolve("./accsess.log"),{ flags: 'a'});

app.use(morgan('combined', { stream: accessLogStream }));

//la parte de arriba sigue siendo parte de la configuracion

app.use("/api/v1", userRoute);

app.use(handleerror)

export default app;