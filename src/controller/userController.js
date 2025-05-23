import apiResponse from "../utils/apiResponse.js";
import Messages from "../utils/messageManager.js";
import responseCodes from "../utils/responcecodes.js";
import userValidation from "../validation/userValidation.js";
import userServices from "../service/userServices.js";
import enrollmentService from "../service/enrollmentService.js";
import Student from "../models/studentModel.js";
import Course from "../models/courcesModel.js";

export class userController {
  // getting user
  async getUser(req, res) {
    try {
      const { id } = req.user; // getting user id from token

      const isUserExist = await userServices.usereExist(id); // checking user exist
      if (!isUserExist) {
        return apiResponse.error(res, {
          status: responseCodes.BAD_REQUEST,
          message: Messages.USER.USER_NOT_EXIST,
        });
      }
      apiResponse.success(res, {
        status: responseCodes.SUCCESS,
        message: Messages.USER.USER_FOUND,
        data: isUserExist,
      });
    } catch (error) {
      return apiResponse.error(res, {
        status: responseCodes.SYSTEM_ERROR, // error handling
        message: Messages.USER.USER_NOT_EXIST,
        data: error,
      });
    }
  }

  async enrollCourse(req, res) {
    try {
      const studentId = req.user.id;
      const { courseId } = req.body;

      // Validations
      const { error } = userValidation.enrollCourseSchema.validate(req.body);
      if (error) {
        return apiResponse.error(res, {
          status: responseCodes.BAD_REQUEST,
          message: error.details[0].message,
          data: {},
        });
      }

      // Check student exists
      const studentExists = await userServices.usereExist(studentId);
      if (!studentExists) {
        return apiResponse.error(res, {
          status: responseCodes.BAD_REQUEST,
          message: Messages.USER.USER_NOT_EXIST,
        });
      }

      //  Check  course exists
      const courseExists = await Course.findByPk(courseId);
      if (!courseExists) {
        return apiResponse.error(res, {
          status: responseCodes.BAD_REQUEST,
          message: Messages.COURSE.COURSE_NOT_EXISTS,
        });
      }

      //  Check if already enrolled
      const alreadyEnrolled = await enrollmentService.alreadyEnroll(
        studentId,
        courseId
      );
      if (alreadyEnrolled) {
        return apiResponse.error(res, {
          status: responseCodes.BAD_REQUEST,
          message: Messages.ENROLLMENT.ALREADY_ENROLLED,
        });
      }

      //  Create enrollment
      const enrollingCourse = await enrollmentService.createEnrollment({
        studentId,
        courseId,
      });

      return apiResponse.success(res, {
        status: responseCodes.SUCCESS,
        message: Messages.ENROLLMENT.ENROLLMENT_SUCCESS,
        data: enrollingCourse,
      });
    } catch (error) {
      return apiResponse.error(res, {
        status: responseCodes.SYSTEM_ERROR,
        message: Messages.ENROLLMENT.ENROLLMENT_FAILED, // error handling
        data: error.message,
      });
    }
  }
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const isUserExist = await userServices.usereExist(id);
      if (!isUserExist) {
        return apiResponse.error(res, {
          status: responseCodes.BAD_REQUEST,
          message: Messages.USER.USER_NOT_EXIST,
        });
      }
      const deleteUser = await userServices.userDelete(id)
      return apiResponse.error(res, {
        status: responseCodes.SUCCESS,
        message: Messages.USER.USER_DELETE_SUCESSFULLY,
        data:deleteUser
      });
    } catch (error) {
      return apiResponse.error(res, {
        status: responseCodes.SYSTEM_ERROR,
        message: Messages.USER.USER_DELETE_FAILED,
      });
    }
  }
  async getAllUsers(req,res){
    try{
      const query= req.query
      const allUsers=await userServices.getAllUsers(query)
        return apiResponse.success(res, {
          status: responseCodes.SUCCESS,
          message: Messages.COURSE.COURSE_FETCH_SUCCESS,
          data:allUsers
        });
    }catch(error){
        return apiResponse.error(res, {
          status: responseCodes.SYSTEM_ERROR,
          message: Messages.COURSE.COURSE_FETCH_FAILED,
          data:error.message
        });
    }
  }
}

export default new userController();
