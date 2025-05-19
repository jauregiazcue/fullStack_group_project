import gameController from "./gameController.js";

async function getGames(req, res) {
  try {
    const games = await gameController.getGames();
    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server error" });
  }
}

async function getGameById(req, res) {
  try {
    const id = req.params.id;
    const games = await gameController.getGameById(id);
    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server error" });
  }
}

async function createGame(req, res) {
  try {
    const data = req.body;
    data.owner = req.params.owner;
    const game = await gameController.createGame(data);
    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server error" });
  }
}

async function removeGame(req, res) {
  try {
    const id = req.params.id;
    const result = await gameController.removeGame(id);
    res.json(result === 1 ? "User correctly removed" :
      "There has been an error in the removing process");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server error" });
  }
}


export default {
  getGames,
  getGameById,
  createGame,
  removeGame,
}
