import {fetchData} from "./fetchData.js";

async function getGameSessionById(gameId){
    const game = await fetchData(`/game/${gameId}`);
    return game;
}

async function startGameSession(gameId){
    const game = await fetchData(`/game/start/${gameId}`,"POST");
    return game;
}

async function joinGameSession(gameId,nickname){
    const game = await fetchData(`/game/join/${gameId}`,"POST",{nickname});
    return game;
}
async function getQuestion(id){
    const question = await fetchData(`/game/question/${id}`);
    return question;
}
async function nextQuestion(id){
    const question = await fetchData(`/game/question/${id}`,"POST");
    return question;
}

export {
    getGameSessionById,
    startGameSession,
    joinGameSession,
    getQuestion,
    nextQuestion
}