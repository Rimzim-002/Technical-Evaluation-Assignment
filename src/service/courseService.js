import Messages from "../utils/messageManager.js";
import Course from "../models/courcesModel.js";
import { escape } from "mysql2";
import Enrollment from "../models/emrollmentModel.js";
import Student from "../models/studentModel.js";
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
    const search = query.search ;
    const sortBy = query.sortBy ;
    const sortOrder = query.sortOrder ;
    const page = parseInt(query.page) ;
    const limit = parseInt(query.limit);
    const offset = (page - 1) * limit;

    const where = {
      isActive: true,
    };

    if (search) {
      where.courseName = { [Op.like]: `%${search}%` };
    }

    // Fetch all  courses
    const courses = await Course.findAll({
      where,
      order: [[sortBy, sortOrder]],
      limit,
      offset,
    });

    // If student, check enrollments
    if (role !== "1") {
      const enrolledCourses = await Enrollment.findAll({
        where: { studentId },
        attributes: ["courseId"],
      });

      // Convert to plain array of IDs
      const enrolledIds = enrolledCourses.map(e => e.courseId);

      // Add isEnrolled flag to each course
      const updatedCourses = courses.map(course => {
        return {
          ...course.toJSON(),
          isEnrolled: enrolledIds.includes(course.id),
        };
      });

      return updatedCourses;
    }

    // If admin, just return all courses
    return courses;

  } catch (error) {
    throw new Error(error.message);
  }
}

  // getting course by id
  async getCourseById(id) {
    try {
      const courseStudents = await Enrollment.findAll({
        where: { courseId: id },
        include: [
          {
            model: Student,
            attributes: ["name", "email", "id"],
          },
        ],
      });
      const students = courseStudents.map((e) => e.student);
      return students;
    } catch (error) {
      throw error;
    }
  }
}

export default new courseServices();
