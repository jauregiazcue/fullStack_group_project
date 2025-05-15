import questionnaireModel from "../models/questionnaire.js";

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

async function editQuestionnaire(id,data) {
  const questionnaire = await questionnaireModel.findByIdAndUpdate(id,data,{ new: true });
  return questionnaire;
}

async function deleteQuestionnaire(id) {
  const questionnaire = await questionnaireModel.findByIdAndDelete(id);
  return questionnaire;
}


export default {
  getQuestionnaires,
  getQuestionnaireById,
  createQuestionnaire,
  editQuestionnaire,
  deleteQuestionnaire,
}
