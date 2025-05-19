import gameModel from "../../models/game.js";


async function getGames() {
  const games = await gameModel.find();
  return games;
}

async function getGameById(id) {
  const game = await gameModel.findById(id);
  if (!game) throw new GameDoesNotExist();

  return game;
}


async function createGame(data) {
  if (!data.title) throw new TitleNotProvided();
  if (!data.questions) throw new QuestionsNotProvided();
  if (!data.owner) throw new OwnerNotProvided();

  const game = new gameModel(data);
  await game.save();
  return game;
}

async function removeGame(id) {
  const Game = await gameModel.findByIdAndDelete(id);
  if (!Game) throw new GameDoesNotExist();
}


export default {
  getGames,
  getGameById,
  createGame,
  removeGame,
}
