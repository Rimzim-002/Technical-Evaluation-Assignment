import { DataTypes } from "sequelize";
import { dbconnection } from "../config/dbConnection.js";
import logger from "../utils/loggerManager.js";
import { nanoid } from "nanoid";
const Student = dbconnection.define(
  "student",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => nanoid(6),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    role: {
      type: DataTypes.ENUM("0", "1"),
      allowNull: false,
      defaultValue: "0",
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

export default Student;
