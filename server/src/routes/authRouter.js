import {Router} from "express";
import authApiController from "../controllers/auth/authApiController.js";

const router = Router();

router.post("/login",authApiController.login);
router.post("/register",authApiController.register);

export default router