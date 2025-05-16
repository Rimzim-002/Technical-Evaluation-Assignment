import { DataTypes } from "sequelize";
import { dbconnection } from "../config/dbConnection.js";
import logger from "../utils/loggerManager.js";
import { nanoid } from "nanoid";
import Student from "./studentModel.js";
import Enrollment from "./emrollmentModel.js";
const Course = dbconnection.define(
  "course",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => nanoid(6),
    },

    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    duration: {
      type: DataTypes.ENUM("3 months", "6 months", "1 year"),
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true,
      },
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

export default Course;
