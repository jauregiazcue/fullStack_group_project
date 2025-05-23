import fetchData from "../fetchData.js";

async function getGameById(gameId){
    const game = await fetchData(`/game/${gameId}`);
    return game;
}

async function startGame(gameId){
    const game = await fetchData(`/game/start/${gameId}`,"POST");
    return game;
}

async function joinGame(gameId,nickname){
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
    getGameById,
    startGame,
    joinGame,
    getQuestion,
    nextQuestion
}