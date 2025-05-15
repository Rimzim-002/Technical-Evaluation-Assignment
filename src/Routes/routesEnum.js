import { Router } from 'express';
import userRoutes from './userRoutes.js';
import authRouter from "./authRouter.js"
import courseRoutes from "./courseRoutes.js"
import  APIPaths  from '../constants/apipaths.js';
const router = Router();

router.use(APIPaths.AUTH, authRouter);
router.use(APIPaths.USER, userRoutes);
router.use(APIPaths.COURSE,courseRoutes);
export default router;
