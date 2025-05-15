import Joi from "joi";
   class  userValidation{
  getId=Joi.object({
        id: Joi.string().required
})
    updateUser=Joi.object({
           id: Joi.string().required,
           updatedData:Joi.string()
    })

 }
 export default new userValidation
    