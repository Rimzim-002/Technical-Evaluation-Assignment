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
      const { id } =req.user;// getting user id from token

      // const { error } = await userValidation.getId.validate(req.params); // validations
      // if (error) {
      //   return apiResponse.error(res, {
      //     status: responseCodes.BAD_REQUEST,
      //     message: error.details[0].message,
      //     data: {},
      //   });
      // }
      const isUserExist = await userServices.usereExist(id);// checking user exist
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
        status: responseCodes.SYSTEM_ERROR,      // error handling
        message: Messages.USER.USER_NOT_EXIST,
        data: error,
      });
    }
  }
  // deleting user
  async deleteUser(req,res){
    try{
    const{id}=req.user.id// getting user from token
    const isUserExist = await userServices.usereExist(id);// checking user exist
      if (!isUserExist) {
        return apiResponse.error(res, {
          status: responseCodes.BAD_REQUEST,
          message: Messages.USER.USER_NOT_EXIST,
        });
      }
      const deteleUser= await userServices.destroyUser(id)// deleting 
      apiResponse.success(res, {
        status: responseCodes.SUCCESS,
        message: Messages.USER.USER_DELETE_SUCESSFULLY,
              });
    } catch (error) {
      return apiResponse.error(res, {
        status: responseCodes.SYSTEM_ERROR,
        message: Messages.USER.USER_DELETE_FAILED,  // error handling
        data: error,
      });
    }}
    // enroll course
 
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
        message: "Student does not exist.",
      });
    }

    //  Check  course exists
    const courseExists = await Course.findByPk(courseId);
    if (!courseExists) {
      return apiResponse.error(res, {
        status: responseCodes.BAD_REQUEST,
        message: "Course does not exist.",
      });
    }

    //  Check if already enrolled
    const alreadyEnrolled = await enrollmentService.alreadyEnroll(studentId, courseId);
    if (alreadyEnrolled) {
      return apiResponse.error(res, {
        status: responseCodes.BAD_REQUEST,
        message: Messages.ENROLLMENT.ALREADY_ENROLLED,
      });
    }

    //  Create enrollment
    const enrollingCourse = await enrollmentService.createEnrollment({ studentId, courseId });

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



  }
  

export default new userController();
