import studentService from "../service/studentService.js";
import apiResponse from "../utils/apiResponse.js";
import Messages from "../utils/messageManager.js";
import responseCodes from "../utils/responcecodes.js";
import joiValidations from "../validation/authValidation.js";
import JwtTokenManager from "../utils/jwtmanager.js";
export class authController {
  // Signup user/student
  async studentSignup(req, res) {
    try {
      const { name, email, password } = req.body;
      const { error } = await joiValidations.signupSchema.validate(req.body); // Joi validations
      if (error) {
        // validation error
        return apiResponse.error(res, {
          status: responseCodes.BAD_REQUEST,
          message: error.details[0].message,
          data: {},
        });
      }

      const isEmailExist = await studentService.emailExist(email); // check email exist

      if (isEmailExist) {
        return apiResponse.error(res, {
          status: responseCodes.BAD_REQUEST,
          message: Messages.USER.EMAIL_EXISTS,
        });
      }

      const createStudent = await studentService.createStudent({
        // creating the user/student
        name,
        email,
        password,
      });
      apiResponse.success(res, {
        status: responseCodes.SUCCESS,
        message: Messages.USER.SIGNUP_SUCCESS,
        data: createStudent,
      });
    } catch (error) {
      // throwing error during signup
      return apiResponse.error(res, {
        status: responseCodes.SYSTEM_ERROR,
        message: Messages.USER.SIGNUP_FAILED,
        data: error,
      });
    }
  }
  // Login student/user
  async studentLogin(req, res) {
    try {
      const { email, password } = req.body;
      const { error } = await joiValidations.loginSchema.validate(req.body); // validations
      if (error) {
        return apiResponse.error(res, {
          // validation errors
          status: responseCodes.BAD_REQUEST,
          message: error.details[0].message,
          data: {},
        });
      }
      const isEmailExist = await studentService.emailExist(email); // check if email exist
      if (!isEmailExist) {
        return apiResponse.error(res, {
          status: responseCodes.BAD_REQUEST,
          message: Messages.USER.EMAIL_NOT_EXISTS,
        });
      }
      // if not exist

      const loginStudent = await studentService.enrollStudent(req.body); // user/student loging
      const token = JwtTokenManager.generateToken({
        // generation token
        id: isEmailExist?.dataValues?.id,
        email: isEmailExist?.dataValues?.email,
        role: isEmailExist?.dataValues?.role,
      });
      apiResponse.success(res, {
        status: responseCodes.SUCCESS,
        message: Messages.USER.LOGIN_SUCCESS,
        data: { loginStudent, token },
      });
    } catch (error) {
      // throwing error
      apiResponse.error(res, {
        status: responseCodes.SYSTEM_ERROR,
        message: Messages.USER.LOGIN_FAILED,
        data: error.message,
      });
    }
  }
}
export default new authController();
