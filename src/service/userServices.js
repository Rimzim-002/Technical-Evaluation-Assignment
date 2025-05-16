import { where } from "sequelize"
import Student from "../models/studentModel.js"
import Messages from "../utils/messageManager.js"
import Enrollment from "../models/emrollmentModel.js"

export  class userServices{
   // user exist or not
    async usereExist(id){
         try{
            const userFound= await Student.findByPk(id)
            return userFound
         }catch(error){
          throw new error
         }
    }
    //delete user
    async destroyUser(id){
         try{
            const deleteUser= await Student.update({isActive:false},{where:{id}})
            return deleteUser
         }catch(error){
          throw new error
         }
    }
   
}

export  default new userServices()