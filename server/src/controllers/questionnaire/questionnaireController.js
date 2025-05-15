import questionnaireModel from "../../models/questionnaire.js";

async function getQuestionnaires() {
  const questionnaires = await questionnaireModel.find();
  return questionnaires;
}

async function getQuestionnaireById(id) {
  const questionnaire = await questionnaireModel.findById(id);
  return questionnaire;
}

async function createQuestionnaire(data) {
  const questionnaire = new questionnaireModel(data);
  await questionnaire.save();
  return questionnaire;
}

async function editQuestionnaire(id, data) {
  const questionnaire = await questionnaireModel.findByIdAndUpdate(id, data, { new: true });
  return questionnaire;
}

async function removeQuestionnaire(id) {
  const questionnaire = await questionnaireModel.findByIdAndDelete(id);
  if (questionnaire === null) {
    throw new Error("The questionnaire does not exist");
  }
}


export default {
  getQuestionnaires,
  getQuestionnaireById,
  createQuestionnaire,
  editQuestionnaire,
  removeQuestionnaire,
}
