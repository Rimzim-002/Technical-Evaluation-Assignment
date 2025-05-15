import { Sequelize } from "sequelize";
import Messages from "../utils/messageManager.js";
import Student from "../models/studentModel.js";
import apiResponse from "../utils/apiResponse.js";
import bcrypt from  "bcrypt"
import logger from "../utils/loggerManager.js";
export  class studentService {

  async emailExist(email) {
    try {
     
      const student = await Student.findOne({
        where: { email:email }
      });
        return student 
    } catch (error) {
      
     logger.error("Error checking email existence:", error);
      throw new Error(Messages.USER.EMAIL_NOT_EXISTS);  
    }
  }
  async create(attibutes){
      try{
         const {name,email,password}= attibutes
      const  hashPassword=await bcrypt.hash(password,8) 
      const createStudent= await Student.create({
         name:name,
         email:email,
         password:hashPassword ,
         role: role || '0', 
           })
           console.log("567",createStudent)
     return createStudent

   }catch(error){
 apiResponse.error({message:Messages.USER.CREATED_FAILED})
   }
      }
}
export default new  studentService