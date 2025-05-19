import questionnaireController from "./questionnaireController.js";

async function getQuestionnaires(req, res) {
  try {
    const questionnaires = await questionnaireController.getQuestionnaires();
    res.json(questionnaires);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server error" });
  }
}

async function getQuestionnaireById(req, res) {
  try {
    const id = req.params.id;
    const questionnaires = await questionnaireController.getQuestionnaireById(id);
    res.json(questionnaires);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server error" });
  }
}

async function getQuestionnairesByOwnerId(req, res) {
  try {
    const owner = req.params.owner;
    const questionnaires = await questionnaireController.getQuestionnairesByOwnerId(owner);
    res.json(questionnaires);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server error" });
  }
}

async function createQuestionnaire(req, res) {
  try {
    const data = req.body;
    data.owner = req.params.owner;
    const questionnaire = await questionnaireController.createQuestionnaire(data);
    res.json(questionnaire);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server error" });
  }
}

async function editQuestionnaire(req, res) {
  try {
    const data = req.body;
    const id = req.params.id;
    data.owner = req.params.owner;
    const questionnaire = await questionnaireController.editQuestionnaire(id, data);
    res.json(questionnaire);
  } catch (error) {
    console.error(error);
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

async function removeQuestionnaire(req, res) {
  try {
    const id = req.params.id;
    const result = await questionnaireController.removeQuestionnaire(id);
    res.json(result === 1 ? "User correctly removed" :
            "There has been an error in the removing process");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server error" });
  }
}


export default {
  getQuestionnaires,
  getQuestionnaireById,
  getQuestionnairesByOwnerId,
  createQuestionnaire,
  editQuestionnaire,
  removeQuestionnaire,
}
