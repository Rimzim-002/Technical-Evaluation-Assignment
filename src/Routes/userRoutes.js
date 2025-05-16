import { Router } from "express";
import userController from "../controller/userController.js";
import RoleMiddleware from "../middleware/authmiddleware.js";
const router = Router();
router.get(
  "/getUser",
  RoleMiddleware.authorizeRoles("0"),
  userController.getUser
);
router.post(
  "/enrollCourse",
  RoleMiddleware.authorizeRoles("0"),
  userController.enrollCourse
);
router.patch(
  "/deleteUser/:id",
  RoleMiddleware.authorizeRoles('1'),
  userController.deleteUser
)
router.get(
  "/gelAllusers",
  RoleMiddleware.authorizeRoles('1'),
  userController.getAllUsers
)
export default router;
