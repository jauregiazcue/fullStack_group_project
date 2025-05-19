import gameModel from "../../models/game.js";
import playerController from "../../controllers/player/playerController.js";
import questionnaireModel from "../../models/questionnaire.js";
import playerModel from "../../models/player.js"
import { PlayerDoesNotExist } from "../../utils/errors/playerErrors.js"
import { customAlphabet } from "nanoid";

const getRandomCode = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 6);

async function getGameById(id) {
  const game = await gameModel.findById(id) //Get the game using the id
    .populate("players", "nickname") //add the players
    .populate("questionnaireId"); //add a questionnaire
  return game;
}

async function createGame(host, questionnaireId) {
  await gameModel.deleteMany({
    host: host,
    questionnaireId: questionnaireId
  });

  const game = new gameModel({
    host: host,
    questionnaireId: questionnaireId,
    code: getRandomCode()
  });
  await game.save();

  return game;
}

async function joinPlayer(nickname, gameId) { //meter _id
  return await playerController.createPlayer(nickname, gameId);
}

async function startGame(gameId) {
  const game = await gameModel.findById(gameId);
  game.state = "started";
  game.updatedAt = new Date();
  await game.save();

  return game;
}

async function nextQuestion(gameId) {
  const game = await gameModel.findById(gameId).populate("questionnaireId");
  game.questionIndex++;
  const questions = game.questionnaireId.questions;

  if (game.questionIndex >= questions.length) {
    game.state = "finished";
    game.questionIndex = 0;
    return null;
  }

  game.updatedAt = new Date();
  await game.save();
  return questions[game.questionIndex];
}

async function getQuestion(gameId) {
  const game = await gameModel.findById(gameId);
  const questionnaire = await questionnaireModel.findById(game.questionnaireId);
  return questionnaire.questions[game.questionIndex];
}

async function saveSocketIdToPlayer(nickname, gameId, socketId) {

  const player = await playerModel.findOne({ nickname, gameId });
  if (!player) throw new PlayerDoesNotExist();

  player.socketId = socketId;
  await player.save();
}



export default {
  getGameById,
  createGame,
  joinPlayer,
  startGame,
  nextQuestion,
  getQuestion,
  removeGame,
  saveSocketIdToPlayer
}
