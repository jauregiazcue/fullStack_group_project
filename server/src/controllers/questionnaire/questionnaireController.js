import questionnaireModel from "../../models/questionnaire.js";
import {
  QuestionnaireDoesNotExist,
  OwnerDoesNotHaveAnyQuestionnaires,
  TitleNotProvided,
  QuestionsNotProvided,
  OwnerNotProvided
} from "../../utils/errors/questionnaireErrors.js"

async function getQuestionnaires() {
  const questionnaires = await questionnaireModel.find();
  return questionnaires;
}

async function getQuestionnaireById(id) {
  const questionnaire = await questionnaireModel.findById(id);
  if (!questionnaire) throw new QuestionnaireDoesNotExist();

  return questionnaire;
}

async function getQuestionnairesByOwnerId(owner) {
  const questionnaires = await questionnaireModel.find(({
    $where: () => { return this.owner === owner; }
  }));
  if (!questionnaires) throw new OwnerDoesNotHaveAnyQuestionnaires();

  return questionnaires;
}

async function createQuestionnaire(data) {
  if (!data.title) throw new TitleNotProvided();
  if (!questions) throw new QuestionsNotProvided();
  if (!owner) throw new OwnerNotProvided();

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
  if (!questionnaire) throw new QuestionnaireDoesNotExist();
}


export default {
  getQuestionnaires,
  getQuestionnaireById,
  getQuestionnairesByOwnerId,
  createQuestionnaire,
  editQuestionnaire,
  removeQuestionnaire,
}
