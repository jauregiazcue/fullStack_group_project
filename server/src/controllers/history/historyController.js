import History from "../models/history.js";
import Questionnaire from "../models/questionnaire.js";
import userController from "./user/userController.js";



async function createNewHistory(userId, questionnaireId, playersData) {

    const user = await userController.getUserById(userId);

    const questionnaire = await getQuestionnaireById(questionnaireId);

    if (!playersData || !Array.isArray(playersData)) {
        throw new Error("Debe introducir un array de jugadores");
    }

    let playersList = [];

    for (let i = 0; i < playersData.length; i++) {
    const playerData = playersData[i];

    if (!playerData.hasOwnProperty("nickname")) { 
      throw new Error("Falta el nickname para el jugador:" + i);
    }

    const nickname = playerData.nickname;

    if (typeof nickname !== "string" || nickname.trim() === "") {
      throw new Error("Nickname inválido para el jugador:" + i);
    }

    const player = {
      nickname: nickname
    };

    playersList.push(player);
  }

  const newHistory = new History({
    user: userId, 
    questionnaire_id: questionnaireId, 
    players: playersList, 
    playedAt: new Date() 
  });

  const savedHistory = await newHistory.save();

  return savedHistory;
}

async function getHistoryById(historyId) {
  const history = await History.findById(historyId) 
    .populate("user", "_id nickname")
    .populate("questionnaire_id", "title"); 
  if (history === null) {
    throw new Error("Historial no encontrado");
  }
  return history;
}

async function getHistoriesByUser(userId) {
  const histories = await History.find({ user: userId }) 
    .populate("user", "_id nickname")
    .populate("questionnaire_id", "title");
  return histories;
}

async function getHistoriesByQuestionnaire(questionnaireId) {
    const histories = await History.find({ questionnaire_id: questionnaireId }) 
      .populate("user", "_id nickname")
      .populate("questionnaire_id", "title");
    return histories;
  }

export default {
  createNewHistory,
  getHistoryById,
  getHistoriesByUser,
  getHistoriesByQuestionnaire
};