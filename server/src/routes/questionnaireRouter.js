import { Router } from "express";
import { isLoggedInAPI } from "../middleware/authMiddleware.js";
import questionnaireController from "../controllers/questionnaire/questionnaireApiController.js";

const router = Router();

//GET ROUTES
router.get("/",questionnaireController.getQuestionnaires);
router.get("/:id",questionnaireController.getQuestionnaireById);

//POST ROUTES
router.post("/",isLoggedInAPI,questionnaireController.createQuestionnaire);

//PUT ROUTES
router.put("/:id/edit",isLoggedInAPI,questionnaireController.editQuestionnaire);

//DELETE ROUTES
router.delete("/:id/delete",isLoggedInAPI,questionnaireController.removeQuestionnaire);


export default router;