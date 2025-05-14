import express from "express";
import logger from "./src/utils/loggerManager.js";
import { connectdb } from "./src/config/dbConnection.js";
import Student from "./src/models/studentModel.js";
import router from "./src/Routes/authRouter.js";
const app= express();
app.use(express.json());
connectdb();
app.use(router)
app.listen((process.env.port), () => {
  logger.info(` Express server started   on port ${process.env.port}`);
});
