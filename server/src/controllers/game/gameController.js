import gameModel from "../../models/game.js";
import playerController from "../../controllers/player/playerController.js";
import questionnaireModel from "../../models/questionnaire.js";
import playerModel from "../../models/player.js"
import { PlayerDoesNotExist } from "../../utils/errors/playerErrors.js"
import {
  GameDoesNotExist,
  QuestionsNotProvided,
  QuestionnaireNotProvided,
  HostNotProvided
} from "../../utils/errors/gameErrors.js";

import { QuestionnaireDoesNotExist } from "../../utils/errors/questionnaireErrors.js";
import { customAlphabet } from "nanoid";

const getRandomCode = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 6);

async function getGameById(id) {
  const game = await gameModel.findById(id) //Get the game using the id
    .populate("players", "nickname") //add the players
    .populate("questionnaireId"); //add a questionnaire

  if (!game) throw new GameDoesNotExist();
  return game;
}

async function createGame(host, questionnaireId) {

  if(!host) throw new HostNotProvided();
  if(!questionnaireId) throw new QuestionnaireNotProvided();
  //Delete the games that are active of the host
  //A host can only have one active game
  await gameModel.deleteMany({
    host: host,
    questionnaireId: questionnaireId
  });
  //Create the new game
  const game = new gameModel({
    host: host,
    questionnaireId: questionnaireId,
    code: getRandomCode()
  });
  await game.save();
  return game;
}

async function joinPlayer(nickname, avatar, gameId) { //meter _id desde front
  return await playerController.createPlayer(nickname, avatar, gameId);
}

async function startGame(gameId) {
  const game = await gameModel.findById(gameId);
  if (!game) throw new GameDoesNotExist();
  game.state = "started";
  game.updatedAt = new Date();
  await game.save();

  return game;
}

async function nextQuestion(gameId) {
  const game = await gameModel.findById(gameId).populate("questionnaireId");
  if (!game) throw new GameDoesNotExist();

  game.questionIndex++;
  const questions = game.questionnaireId.questions;
  if(!questions) throw new QuestionsNotProvided();

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
  if (!game) throw new GameDoesNotExist();
  const questionnaire = await questionnaireModel.findById(game.questionnaireId);
  if(!questionnaire) throw new QuestionnaireDoesNotExist();
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
  saveSocketIdToPlayer
}
