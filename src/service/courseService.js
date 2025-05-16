import Course from "../models/courcesModel.js";
import { escape } from "mysql2";
import Enrollment from "../models/emrollmentModel.js";
import Student from "../models/studentModel.js";
import { Op } from "sequelize";
export class courseServices {
  async findcourse(name) {
    try {
      const isCourseExist = await Course.findOne({
        // find coutse by name
        where: { name: name },
      });
      return isCourseExist;
    } catch (error) {
      throw error;
    }
  }
  // creating new course
  async newCourse(attibutes) {
    const { name, duration, price } = attibutes;
    try {
      const createCourse = await Course.create({
        name: name,
        duration: duration,
        price: price,
      });
      return createCourse;
    } catch (error) {
      throw new Error(error);
    }
  }
  //getting all courses
  async getAllCourses(role, studentId, query) {
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
      const courses = await Course.findAll({
        where: {
          isActive: true,
          name: { [Op.like]: `%${search}%` },
        },
        order: [[sortBy, sortOrder]],
        limit: parseInt(limit),
        offset: parseInt(offset),
      });

      // If user is a student, add isEnrolled flag
      if (role !== "1") {
        const enrolledCourses = await Enrollment.findAll({
          where: { studentId },
          attributes: ["courseId"],
        });

        const enrolledIds = enrolledCourses.map((e) => e.courseId);

        const updatedCourses = courses.map((course) => {
          const data = course.toJSON();
          return {
            ...data,
            isEnrolled: enrolledIds.includes(course.id),
          };
        });

        return updatedCourses;
      }

      return courses;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // getting course by id
  async getCourseById(id, role) {
    try {
      if (role === "1") {
        const course = await Course.findByPk(id, {
          attributes: ["id", "name", "duration", "price"],
          include: [
            {
              model: Enrollment,
              include: [
                {
                  model: Student,
                  attributes: ["id", "name", "email"],
                },
              ],
            },
          ],
        });
        // Extract student list from enrollments
        const students = course.enrollments.map((e) => e.student);

        return {
          courseDetails: {
            id: course.id,
            title: course.name,
            price: course.price,
            duration: course.duration,
          },
          students,
        };
      } else {
        const userCourse = await Course.findByPk(id, {
          attributes: ["id", "name", "duration", "price"],
        });
        return userCourse;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default new courseServices();
