import gameController from "./gameController.js";
import gameModel from "../../models/game.js";

function startTimer(io, timer = 30) {
  const interval = setInterval(() => {
    timer--;
    console.log("timer", timer);
    if (timer === 0) {
      clearInterval(interval);
    }
    io.emit("timer", timer);
  }, 1000);
}

async function getGameById(req, res) {
  try {
    const id = req.params.gameId;
    res.json(await gameController.getGameById(id));
  } catch (error) {
    console.error(error);
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

async function createGame(req, res) {
  try {
    const host = req.body.host;
    const questionnaireId = req.params.questionnaireId;
    res.json(await gameController.createGame(host, questionnaireId));
  } catch (error) {
    console.error(error);
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

async function joinPlayer(req, res) { 
  try {
    const nickname = req.body.nickname;
    const avatar = req.body.avatar;
    const id = req.params.gameId;
    res.json(await gameController.joinPlayer(nickname, avatar, id));
  } catch (error) {
    console.error(error);
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

async function startGame(req, res) {
  try {
    const id = req.params.gameId;
    const io = req.io;

    const game = await gameController.startGame(id);
    io.emit("GameStarted", game);
    startTimer(io);
    res.json(game);
  } catch (error) {
    console.error(error);
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

async function nextQuestion(req, res) {
  try {
    const id = req.params.gameId;
    const io = req.io;

    const question = await gameController.nextQuestion(id);
    if (!question) {
      io.emit("GameFinished", gameModel.findById(id));
      res.json("Game has been finished");
    }
    io.emit("NextQuestion", question);
    startTimer(io, question.timer || 30);
    res.json(question);
  } catch (error) {
    console.error(error);
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

async function getQuestion(req, res) {
  try {
    const id = req.params.gameId;
    res.json(await gameController.getQuestion(id));
  } catch (error) {
    console.error(error);
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default {
  getGameById,
  createGame,
  joinPlayer,
  startGame,
  nextQuestion,
  getQuestion
}
