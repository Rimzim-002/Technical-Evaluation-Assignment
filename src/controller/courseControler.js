import courseService from "../service/courseService.js";
import apiResponse from "../utils/apiResponse.js";
import Messages from "../utils/messageManager.js";
import responCecodes from "../utils/responcecodes.js";
import courseValidations from "../validation/courseValidations.js";

export class courseController {
  async createCourse(req, res) {
    const { name, duration, price } = req.body;
    try {
      const { error } = await courseValidations.createSchema.validate(req.body);
      if (error) {
        return apiResponse.error(res, {
          status: responCecodes.BAD_REQUEST,
          message: error.details[0].message,
          data: {},
        });
      }
      const isCourseExist = await courseService.findcourse(name);
      if (isCourseExist) {
        return apiResponse.error(res, {
          status: responCecodes.BAD_REQUEST,
          message: Messages.COURSE.COURSE_EXISTS,
          
        });
      }
      const creatingCourse = await courseService.newCourse(req.body);
      
     return  apiResponse.success(
        res,
        {
          status: responCecodes.SUCCESS,
          message: Messages.COURSE.COURSE_SUCCESS,
          data: creatingCourse ,
        },
      
      );
    } catch (error) {
      return apiResponse.error(res, {
        status: responCecodes.SYSTEM_ERROR,
        message: Messages.COURSE.COURSE_FAILED,
        data:error.message  
      });
    }
  }
}
export default new courseController()