import { Router } from "express";
import { isLoggedInAPI } from "../middleware/authMiddleware.js";
import questionnaireController from "../controllers/questionnaire/questionnaireApiController.js";

const router = Router();

//GET ROUTES
router.get("/",questionnaireController.getQuestionnaires);
router.get("/:id",questionnaireController.getQuestionnaireById);
router.get("/o/:owner",questionnaireController.getQuestionnairesByOwnerId);

//POST ROUTES
router.post("/:owner",isLoggedInAPI,questionnaireController.createQuestionnaire);

//PUT ROUTES
router.put("/:owner/:id/edit",isLoggedInAPI,questionnaireController.editQuestionnaire);

//DELETE ROUTES
router.delete("/:owner/:id/delete",isLoggedInAPI,questionnaireController.removeQuestionnaire);


export default router;