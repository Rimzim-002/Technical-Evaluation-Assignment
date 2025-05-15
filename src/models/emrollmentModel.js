import { DataTypes } from "sequelize";
import { dbconnection } from "../config/dbConnection.js";
import logger from "../utils/loggerManager.js";
import { nanoid } from "nanoid";
import Student from "./studentModel.js";
import Course from "./courcesModel.js";
const Enrollment = dbconnection.define(
  "enrollment",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => nanoid(6),
    },
    studentId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "students",
        key: "id",
      },
    },
    courseId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Course",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

// One student can have many enrollments
Student.hasMany(Enrollment, {
  foreignKey: "studentId",
  onDelete: "CASCADE",
});

// One course can have many enrollments
Course.hasMany(Enrollment, {
  foreignKey: "courseId",
});

// Each enrollment belongs to one student
Enrollment.belongsTo(Student, {
  foreignKey: "studentId",
});

// Each enrollment belongs to one course
Enrollment.belongsTo(Course, {
  foreignKey: "courseId",
});
 Enrollment.sync()
 .then(()=>{
    logger.info("Enrollment Table created successfuly")
 })
 .catch((error)=>{
    logger.error('"Error in creating Enrollment table',error)
 })
export default Enrollment;
