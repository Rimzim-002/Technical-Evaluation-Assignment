import Joi from "joi";
class userValidation {
  getId = Joi.object({
    id: Joi.string().required
  })
  updateUser = Joi.object({
    id: Joi.string().required,
    updatedData: Joi.string()
  })

  enrollCourseSchema = Joi.object({
    courseId: Joi.string().required(),
  });
}

export default new userValidation
