import Player from "../../models/player.js";
//import Game from "../../models/game.js";
import { PlayerAlredyExist, PlayerDoesNotExist } from "../../utils/errors/playerErrors.js";


async function getPlayerById(playerId) {
    const player = await Player.findById(playerId);
    if (player === null) {
        throw new PlayerDoesNotExist();
    }
    return player;
}

async function createPlayer(nickname, gameId) {

    const gameSession = await Game.findOne({ code: gameId }).populate("players");

    if (gameSession.players.some(player => player.nickname === nickname)) {
        return new PlayerAlredyExist;
    }

    const newPlayer = new Player({ nickname: nickname, gameId: gameId })
    await newPlayer.save();

    gameSession.players.push(newPlayer);
    await gameSession.save();

    return newPlayer;

}

async function editPlayer(gameId, playerId, data) {

    const gameSession = await Game.findOne({ code: gameId }).populate("players");

    if (gameSession.players.some(player => player.nickname === nickname)) {
        return new PlayerAlredyExist;
    }

    const player = await Player.findByIdAndUpdate(playerId, data, { new: true });
    return player;

}

async function removePlayer(playerId) {
    
    const player = await Player.findByIdAndDelete(playerId);

    if(player === null){
        throw new PlayerDoesNotExist();
    }

}

export default {
    getPlayerById,
    createPlayer,
    editPlayer,
    removePlayer
}