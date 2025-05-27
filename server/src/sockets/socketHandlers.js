const gameSockets = {};

export default function registerSocketHandlers(io) {
  io.on("connection", (socket) => {
    console.log("Connection", socket.id);

    socket.on("register", ({ gameId, userId, isHost }) => {
      if (!gameSockets[gameId]) {
        gameSockets[gameId] = { host: null, players: {} };
      }
      if (isHost) {
        gameSockets[gameId].host = socket.id;
      } else {
        gameSockets[gameId].players[userId] = socket.id;
      }
    });

    socket.on("playerToHost", ({ response }) => {
        if(response=="true"){
            io.emit("playerData", { response });
        }
    });

    socket.on("disconnect", () => {
      // Optional cleanup logic
    });
  });
}
