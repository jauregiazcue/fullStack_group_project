import historyController from "./historyController.js";


async function createHistory(req, res) { 
  try {
    const { userId, questionnaireId, playersData } = req.body; 
    const result = await historyController.createNewHistory(userId, questionnaireId, playersData); 
  } catch (error) {
    console.error(error);
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

async function getHistoryById(req, res) {
  try {
    const historyId = req.params.historyId;
    const result = await historyController.getHistoryById(historyId); //REVISAR
    res.json(result);
  } catch (error) {
    console.error(error);
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

async function getHistoriesByUser(req, res) {
  try {
    const userId = req.params.userId;
    const result = await historyController.getHistoriesByUser(userId);
    res.json(result);
  } catch (error) {
    console.error(error);
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

async function getHistoriesByQuestionnaire(req, res) {
  try {
    const questionnaireId = req.params.questionnaireId;
    const result = await historyController.getHistoriesByQuestionnaire(questionnaireId);
    res.json(result);
  } catch (error) {
    console.error(error);
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

export default {
  createHistory,
  getHistoryById,
  getHistoriesByUser,
  getHistoriesByQuestionnaire
};