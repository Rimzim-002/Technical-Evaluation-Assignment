import Joi from "joi";
class joiValidation {
   signupSchema = Joi.object({
      name: Joi.string()
         .min(3)
         .max(30)
         .required(),
      email: Joi.string()
         .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string()
         .min(8)
         .max(10)
         .pattern(new RegExp('^[a-zA-Z0-9@#$%^&*!_+=-]{8,30}$'))
         .required(),

   })
   loginSchema = Joi.object({
      email: Joi.string()
         .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
         .required(),
      password: Joi.string()
         .required(),

   })

}
export default new joiValidation
