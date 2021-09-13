import express from "express";
import userRoute from "./routes/users.routes.js";

const app = express();

app.use("/api/v1", userRoute);

export default app;