import { Router } from "express";
import  courseController from "../controller/courseControler.js";
import RoleMiddleware from "../middleware/authmiddleware.js"
const router= Router();
 router.post("/createCourse",RoleMiddleware.authorizeRoles('1'),courseController.createCourse)
//  router.patch("/deleteUser/:id",RoleMiddleware.authorizeRoles('0'),userController.deleteUser)

  export default  router