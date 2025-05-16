import { Op } from "sequelize";
import Student from "../models/studentModel.js";

export class userServices {
  // user exist or not
  async usereExist(id) {
    try {
      const userFound = await Student.findByPk(id);
      return userFound;
    } catch (error) {
      throw new error();
    }
  }
async userDelete(id) {
  try {
    await Student.update(
      { isActive: false },
      { where: { id } }
    );

    const userDeleted = await Student.findOne({
      where: { id },
      attributes: { exclude: ['password'] } 
    });

    return userDeleted;
  } catch (error) {
    throw new Error(error.message);
  }
}
  async getAllUsers(query) {
    try {
      const {
        search = "",
        sortBy = "createdAt",
        sortOrder = "DESC",
        page = 1,
        limit = 10,
      } = query;

      const offset = (page - 1) * limit;

      // Find all courses with search, sort, pagination
      const courses = await Student.findAll({
        where: {
          isActive: true,
          name: { [Op.like]: `%${search}%` },
        },
        order: [[sortBy, sortOrder]],
        limit: parseInt(limit),
        offset: parseInt(offset),
      });
   return courses;
    } catch (error) {
      throw new Error(error.message);
    }
  }


}

export default new userServices();
