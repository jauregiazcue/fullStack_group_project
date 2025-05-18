import questionnaireController from "./questionnaireController.js";

async function getQuestionnaires(req, res) {
  try {
    const questionnaires = await questionnaireController.getQuestionnaires();
    res.json(questionnaires);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

async function getQuestionnaireById(req, res) {
  try {
    const id = req.params.id;
    const questionnaires = await questionnaireController.getQuestionnaireById(id);
    res.json(questionnaires);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
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
    res.status(500).json({ error: "Server error" });
  }
}

async function editQuestionnaire(req, res) {
  try {
    const data = req.body;
    const id = req.params.id;
    const questionnaire = await questionnaireController.editQuestionnaire(id, data);
    res.json(questionnaire);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

async function removeQuestionnaire(req, res) {
  try {
    const id = req.params.id;
    const questionnaire = await questionnaireController.removeQuestionnaire(id);
    res.json(questionnaire);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}


export default {
  getQuestionnaires,
  getQuestionnaireById,
  createQuestionnaire,
  editQuestionnaire,
  removeQuestionnaire,
}
