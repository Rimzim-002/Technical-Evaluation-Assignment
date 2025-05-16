import { Router } from "express";
import userController from "../controller/userController.js";
import RoleMiddleware from "../middleware/authmiddleware.js"
const router= Router();
 router.get("/getUser",RoleMiddleware.authorizeRoles('0'),userController.getUser)
 router.patch("/deleteUser",RoleMiddleware.authorizeRoles('0'),userController.deleteUser)
router.post("/enrollCourse",RoleMiddleware.authorizeRoles('0'),userController.enrollCourse)
  export default  router