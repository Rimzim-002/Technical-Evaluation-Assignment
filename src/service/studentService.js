import { Sequelize } from "sequelize";
import Messages from "../utils/messageManager.js";
import Student from "../models/studentModel.js";
import apiResponse from "../utils/apiResponse.js";
import bcrypt from  "bcrypt"
export  class studentService {

  async emailExist(email) {
    try {
      const isEmailExist = await Student.findOne({
        where: {email:email},
      })
      console.log(isEmailExist,"5678")
    return isEmailExist
    } catch (error) {
      apiResponse.error({ message: Messages.USER.EMAIL_NOT_EXISTS });
    }
  }
  async create(attibutes){
      try{
         const {name,email,password}= attibutes
      const  hashPassword=await bcrypt.hash(password,8) 
      const createStudent= await Student.create({
         name:name,
         email:email,
         password:hashPassword 
           })
     return createStudent

   }catch(error){
 apiResponse.error({message:Messages.USER.CREATED_FAILED})
   }
      }
}
export default new  studentService