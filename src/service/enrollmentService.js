import Enrollment from "../models/emrollmentModel.js";

export class enrollmentService {
  // Find if enrollment exists for a student and course
  async findEnrollment(studentId, courseId) {
  try {
    return await Enrollment.findOne({
      where: { studentId, courseId },
    });
  } catch (error) {
    throw error;
  }
}

async alreadyEnroll(studentId, courseId) {
  return this.findEnrollment(studentId, courseId);
}


  // Create new enrollment
  async createEnrollment(payload) {
  try {
    if (!payload.studentId || !payload.courseId) {
      throw new Error("Missing studentId or courseId in payload");
    }

    console.log("Creating enrollment for:", payload);

    const enrollment = await Enrollment.create({
      studentId: payload.studentId,
      courseId: payload.courseId,
    });

    return enrollment;
  } catch (error) {
    console.error("Enrollment creation failed:", error.message);
    throw error;
  }
}

}

export default new enrollmentService();
