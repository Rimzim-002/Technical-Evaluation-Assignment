import Messages from "../utils/messageManager.js";
import Student from "../models/studentModel.js";
import apiResponse from "../utils/apiResponse.js";
import bcrypt from "bcrypt";
import logger from "../utils/loggerManager.js";
export class studentService {
  async emailExist(email) {
    // checking is email exist
    try {
      const existMail = await Student.findOne({
        where: { email: email },
      });
      return existMail;
    } catch (error) {
      logger.error("Error checking email existence:", error);
      throw new Error(Messages.USER.EMAIL_NOT_EXISTS);
    }
  }
  // login
  async createStudent(attibutes) {
    const { name, email, password } = attibutes;
    try {
      const hashPassword = await bcrypt.hash(password, 8); // password hashing
      const newStudent = await Student.create({
        name: name,
        email: email,
        password: hashPassword,
      });
      return newStudent;
    } catch (error) {
      throw new error();
    }
  }
  //signup
  async enrollStudent(attributes) {
    const { email, password } = attributes;
    try {
      const isUserExist = await Student.findOne({ where: { email } }); // finding user by email
      if (!isUserExist) {
        throw new Error(Messages.USER.USER_NOT_EXIST);
      }

      // Validate the password
      const isPasswordValid = await bcrypt.compare(
        password,
        isUserExist?.dataValues?.password
      );
      if (!isPasswordValid) {
        throw new Error(Messages.VALIDATION.INVALID_INPUT);
      }
      return isUserExist.get();
    } catch (error) {
      throw new Error(Messages.SYSTEM.SERVER_ERROR);
    }
  }
}
export default new studentService();
