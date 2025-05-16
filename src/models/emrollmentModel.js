import { DataTypes } from "sequelize";
import { dbconnection } from "../config/dbConnection.js";
import logger from "../utils/loggerManager.js";
import { nanoid } from "nanoid";

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
        model: "course",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default Enrollment;
