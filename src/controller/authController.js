import  studentService from "../service/studentService.js"
import apiResponse from "../utils/apiResponse.js"
import Messages from "../utils/messageManager.js"
import  responseCodes  from "../utils/responcecodes.js"
import joiValidations from "../validation/authValidation.js"
export  class authController{
async studentSignup(req,res){
    try{
     const {name,email,password}=req.body
     await joiValidations.signupSchema.validate(req.body)
     const isEmailExist =await studentService.emailExist(email)
     console.log(isEmailExist,"3456789")

     if(isEmailExist){
        // apiResponse.error(res,{status:responseCodes.NOT_FOUND,message:Messages.USER.EMAIL_EXISTS,data:{}})
         return res.status(500).json({
      status: 200,
      message: Messages.USER.EMAIL_EXISTS,
      data:isEmailExist,
    });
     }
     const createStudent= await studentService.create(req.body)
      // apiResponse.success(res,{status:responseCodes.CREATED,message:Messages.USER.CREATED_SUCESSFULLY,data:{createStudent}})
return res.status(200).json({
      status: 200,
      message: Messages.USER.EMAIL_EXISTS,
      data:createStudent,
    });
    }catch(error){
      // apiResponse.error(res,{status:responseCodes.SYSTEM_ERROR,message:Messages.USER.CREATED_FAILED,data:error.message})
  return res.status(500).json({
      status: 200,
      message: Messages.USER.EMAIL_EXISTS,
      data:error,
    });
    }
    
}


}
export default new authController