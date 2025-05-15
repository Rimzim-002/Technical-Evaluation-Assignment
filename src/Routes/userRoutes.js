import { Router } from "express";
import userController from "../controller/userController.js";
import RoleMiddleware from "../middleware/authmiddleware.js"
const router= Router();
 router.get("/getUser/:id",RoleMiddleware.authorizeRoles('0'),userController.getUser)
 router.patch("/deleteUser/:id",RoleMiddleware.authorizeRoles('0'),userController.deleteUser)

  export default  router