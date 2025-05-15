import  studentService from "../service/studentService.js"
import apiResponse from "../utils/apiResponse.js"
import Messages from "../utils/messageManager.js"
import  responseCodes  from "../utils/responcecodes.js"
import joiValidations from "../validation/authValidation.js"
export  class authController{
async studentSignup(req,res){
    try{
     const {name,email,password}=req.body
     const {error }=await joiValidations.signupSchema.validate(req.body)
     if (error) {
        console.error('Joi validation error:', error.details);  
        return apiResponse.error(res, {
          status: responseCodes.BAD_REQUEST,
          message: error.details[0].message,  
          data: {}
        });
      }

     const isEmailExist =await studentService.emailExist(email)
console.log("6789",isEmailExist)
     if(isEmailExist){
  return apiResponse.error(res, {
          status: responseCodes.BAD_REQUEST,
          message: Messages.USER.EMAIL_EXISTS,
          data: {} 
        });        
     }
     const createStudent= await studentService.create({name,email,password})
apiResponse.success(res, {
        status: responseCodes.CREATED,
        message: Messages.USER.CREATED_SUCESSFULLY,
        data: { createStudent } });
    }catch(error){
     apiResponse.error(res, {
          status: responseCodes.SYSTEM_ERROR,
          message: Messages.SYSTEM.SERVER_ERROR,
          data: {} 
        });  
    }
    
}


}
export default new authController