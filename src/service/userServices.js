import { where } from "sequelize"
import Student from "../models/studentModel.js"
import Messages from "../utils/messageManager.js"

export  class userServices{
    async usereExist(id){
         try{
            const userFound= await Student.findByPk(id)
            return userFound
         }catch(error){
          throw new error
         }
    }
    async destroyUser(id){
         try{
            const deleteUser= await Student.update({isActive:false},{where:{id}})
            return deleteUser
         }catch(error){
          throw new error
         }
    }
      async update(attributes){
         try{
            const {id,updatedData}=attributes
            if(updatedData.email===Student.findOne({where:{email:updateUser.email}})){
                throw new Error({message:Messages.USER.EMAIL_EXISTS});
                
            }
            const updateUser= await Student.update({updatedData},{where:{id}})
            console.log("56780",updateUser)
            return userFound
         }catch(error){
          throw new error
         }
    }
}

export  default new userServices()