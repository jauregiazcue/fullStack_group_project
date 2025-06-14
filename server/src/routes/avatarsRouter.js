import avatarsApiController from "../controllers/avatars/avatarsApiController.js";
import {Router} from "express";


const router = Router();

//GET ROUTES
router.get("/",avatarsApiController.getAvatars);
router.get("/:id",avatarsApiController.getAvatarById);

export default router;