import express from "express";
import logger from "./src/utils/loggerManager.js";
import { connectdb } from "./src/config/dbConnection.js";
import Student from "./src/models/studentModel.js";
import Course from "./src/models/courcesModel.js";
import Enrollment from "./src/models/emrollmentModel.js";
import router from "./src/Routes/routesEnum.js";
// import seedAdmin from "./src/config/adminseeder.js"
const app= express();
app.use(express.json());
connectdb();
// seedAdmin();
app.use(router)
app.listen((process.env.port), () => {
  logger.info(` Express server started   on port ${process.env.port}`);
});
