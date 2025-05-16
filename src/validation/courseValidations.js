import Joi from "joi";
class courseValidation {
   createSchema = Joi.object({
      name: Joi.string()
         .min(3)
         .max(30)
         .required(),
      price: Joi.number()
         .required(),
      duration: Joi.string()
         .valid("3 months", "6 months", "1 year") // only these values allowed
         .required(),

   })


}
export default new courseValidation
