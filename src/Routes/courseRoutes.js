import { Router } from "express";
import  courseController from "../controller/courseControler.js";
import RoleMiddleware from "../middleware/authmiddleware.js"
const router= Router();
 router.post("/createCourse",RoleMiddleware.authorizeRoles('1'),courseController.createCourse)
 router.get("/getCourse/:id",RoleMiddleware.authorizeRoles('0','1'),courseController.getCourseById) 
  router.get("/getAllCourse",RoleMiddleware.authorizeRoles('0','1'),courseController.getAllCourses)

  export default  router