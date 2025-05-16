import express from "express";
import logger from "./src/utils/loggerManager.js";
import { connectdb,dbconnection } from "./src/config/dbConnection.js";
import {Student, Course, Enrollment} from "./src/models/indexModel.js"
import router from "./src/Routes/routesEnum.js";
import seedAdmin from "./src/config/adminseeder.js"
const app = express();
app.use(express.json());

const startServer = async () => {
  try {
    await connectdb();
    await dbconnection.sync({ alter: true }); 
    logger.info("All models synced successfully");
    await seedAdmin();

    app.use(router);
    const PORT = process.env.port || 5000;
    app.listen(PORT, () => {
      logger.info(`Server started on port ${PORT}`);
    });
  } catch (error) {
    logger.error(" Failed to start server:", error);
  }
};

startServer();