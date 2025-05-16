import courseService from "../service/courseService.js";
import apiResponse from "../utils/apiResponse.js";
import Messages from "../utils/messageManager.js";
import responCecodes from "../utils/responcecodes.js";
import courseValidations from "../validation/courseValidations.js";

export class courseController {
  async createCourse(req, res) {
    const { name, duration, price } = req.body;
    try {
      const { error } = courseValidations.createSchema.validate(req.body); //  validations
      if (error) {
        return apiResponse.error(res, {
          status: responCecodes.BAD_REQUEST,
          message: error.details[0].message, // validation error
          data: {},
        });
      }
      const isCourseExist = await courseService.findcourse(name); // check if coursse exist or not
      if (isCourseExist) {
        return apiResponse.error(res, {
          status: responCecodes.BAD_REQUEST,
          message: Messages.COURSE.COURSE_EXISTS,
        });
      }
      const creatingCourse = await courseService.newCourse(req.body); // creating  course

      return apiResponse.success(res, {
        status: responCecodes.SUCCESS,
        message: Messages.COURSE.COURSE_SUCCESS,
        data: creatingCourse,
      });
    } catch (error) {
      return apiResponse.error(res, {
        status: responCecodes.SYSTEM_ERROR,
        message: Messages.COURSE.COURSE_FAILED, // error handling
        data: error,
      });
    }
  }
  // get all courses
  async getAllCourses(req, res) {
     const role = req.user.role;        
    const studentId = req.user.id;     
    const query = req.query;     

    try {
      const allCourses = await courseService.getAllCourses(role, studentId, query); //finding
      if (!allCourses) {
        return apiResponse.error(res, {
          status: responCecodes.BAD_REQUEST,
          message: Messages.COURSE.COURSE_NOT_FOUND,
        });
      }
      return apiResponse.success(res, {
        status: responCecodes.SUCCESS,
        message: Messages.COURSE.COURSE_FETCH_SUCCESS,
        data: allCourses,
      });
    } catch (error) {
      return apiResponse.error(res, {
        status: responCecodes.SYSTEM_ERROR,
        message: Messages.COURSE.COURSE_FETCH_FAILED,
        data: error.message,
      });
    }
  }
  async getCourseById(req, res) {
    const { id } = req.params;
    const{role}=req.user
    try {
      const course = await courseService.getCourseById(id,role);
      if (!course) {
        return apiResponse.error(res, {
          status: responCecodes.BAD_REQUEST,
          message: Messages.COURSE.COURSE_NOT_FOUND,
        });
      }
      return apiResponse.success(res, {
        status: responCecodes.SUCCESS,
        message: Messages.COURSE.COURSE_FOUND,
        data: course,
      });
    } catch (error) {
      return apiResponse.error(res, {
        status: responCecodes.SYSTEM_ERROR,
        message: Messages.COURSE.COURSE_FAILED,
        data: error.message,
      });
    }
  }
}
export default new courseController();
