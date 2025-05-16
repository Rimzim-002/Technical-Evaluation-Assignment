import Course from "./courcesModel.js";
import Enrollment from "./emrollmentModel.js";
import Student from "./studentModel.js";


// Realations
Student.belongsToMany(Course, { through: Enrollment, foreignKey: "studentId" });
Course.belongsToMany(Student, { through: Enrollment, foreignKey: "courseId" });

Student.hasMany(Enrollment, { foreignKey: "studentId", onDelete: "CASCADE" });
Enrollment.belongsTo(Student, { foreignKey: "studentId" });

Course.hasMany(Enrollment, { foreignKey: "courseId" });
Enrollment.belongsTo(Course, { foreignKey: "courseId" });

export { Student, Course, Enrollment };
