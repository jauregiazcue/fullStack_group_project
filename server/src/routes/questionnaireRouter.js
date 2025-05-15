import { Router } from "express";
import questionnaireController from "../controllers/questionnaireApiController.js";
const router = Router();

//GET ROUTES
router.get("/",questionnaireController.getQuestionnaires);
router.get("/:id",questionnaireController.getQuestionnaireById);

//POST ROUTES
router.post("/",questionnaireController.createQuestionnaire);

//PUT ROUTES
router.put("/:id/edit",questionnaireController.editQuestionnaire);

//DELETE ROUTES
router.delete("/:id/delete",questionnaireController.deleteQuestionnaire);


export default router;