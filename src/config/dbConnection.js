import { Sequelize } from "sequelize";
import { config } from "dotenv";
import logger from "../utils/loggerManager.js";
config(); 
const dbconnection = new Sequelize(// database  with env varibles
  process.env.DATABASE ,
  process.env.DATABASE_USER ,
  process.env.DATABASE_PASSWORD ,
  {
    host: process.env.DATABASE_HOST ,
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306
  },
);
const connectdb= async()=>{
    try{
  await dbconnection.authenticate()
  
    logger.info("Database connect successfully")
    
    }catch(error){
     logger.error("Error is databseconnection")
    }
}
  export {dbconnection,connectdb}