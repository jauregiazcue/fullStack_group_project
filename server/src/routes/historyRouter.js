import {Router} from "express";
import historyApiController from "../controllers/historyApiController.js";
/* import { isLoggedInAPI } from "../middleware/authMiddleware.js";*/
//El historial es público o sólo puede evrlo el host??

const router = Router();


router.get("/host/:hostId", historyApiController.getHistoriesByHost);

router.get("/questionnaire/:questionnaireId", historyApiController.getHistoriesByQuestionnaire);

router.get("/:historyId", historyApiController.getHistoryById);

router.post("/",historyApiController.createHistory);

export default router