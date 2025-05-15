import { DataTypes } from "sequelize";
import { dbconnection } from "../config/dbConnection.js";
import logger from "../utils/loggerManager.js";
import { nanoid } from "nanoid";
import Student from "./studentModel.js";
 const  Course=  dbconnection.define(
    'Course',
    {
    
    id: {
      type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => nanoid(6),
    },
    // studentId: {
    //       type: DataTypes.STRING,
    //       allowNull: false,
    //       references: {
    //         model:Student,
    //         key: 'id',
    //       },
    //     },
    name:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
       },
    duration:{
        type:DataTypes.ENUM("3 months","6 months","1 year"),
          allowNull:false,
    },
    isActive:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    },
    price:{
    type:DataTypes.NUMBER,
    allowNull:false
    }

},{
    timestamps:true,
    createdAt:true,
    updatedAt:true
}
)
Student.belongsToMany(Course, { through: 'StudentCourses' }); 
Course.belongsToMany(Student, { through: 'StudentCourses' });
 Course.sync()
 .then(()=>{
    logger.info("Course Table created successfuly")
 })
 .catch((error)=>{
    logger.error('"Error in creating Course table',error)
 })


 export default Course