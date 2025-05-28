import { Router } from "express";
import { isLoggedInAPI } from "../middleware/authMiddleware.js";
import gameController from "../controllers/game/gameApiController.js";

const router = Router();

//GET ROUTES
router.get("/:gameId",gameController.getGameById);


//POST ROUTES
router.post("/:questionnaireId",isLoggedInAPI,gameController.createGame);


router.post("/join/:gameId",gameController.joinPlayer);
router.post("/start/:gameId",gameController.startGame);
router.put("/edit/:gameId/:playerId",gameController.editPlayer);
router.delete("/remove/:gameId/:playerId",gameController.removePlayer);

router.get("/question/:gameId",gameController.getQuestion);
router.post("/question/:gameId",gameController.nextQuestion);


export default router;