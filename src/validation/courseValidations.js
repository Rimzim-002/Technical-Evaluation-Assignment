import Joi from "joi";
   class  courseValidation{
  createSchema=Joi.object({
        name:Joi.string()
        .min(3)
        .max(30)
        .required(),
        price: Joi.number()
        .required(),
         duration: Joi.string()
        //  .$_match("3 months","6months","1 yaer")
    .required(),

    })


 }
 export default new courseValidation
    