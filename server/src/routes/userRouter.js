import {Router} from "express";
import userApiController from "../controllers/user/userApiController.js";
import { isLoggedInAPI } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/:id",userApiController.getUserById);
router.get("/:id/wins",userApiController.getUserWins);
router.get("/:id/nickname",userApiController.getUserNickname);
router.put("/:id/edit", isLoggedInAPI, userApiController.editUserNickname);
router.delete("/:id/delete", isLoggedInAPI, userApiController.removeUser);

export default router