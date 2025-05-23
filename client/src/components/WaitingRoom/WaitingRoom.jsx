import WaitingList from "./WaitingList";
import AvatarSelector from "./AvatarSelector";
import { useEffect, useState } from 'react';
// import Game from "../pages/Game";

function getAllAvatars() {
  const avatars = [];
  for (let i = 0; i < 10; i++) {
    const index = String(i + 1).padStart(2, "0");
    const avatarUrl = `/src/assets/avatars/avatar (${index}).svg`;
    avatars.push({
      idAvatar: i,
      avatarUrl: avatarUrl,
    });
  }
  console.log("avatars", avatars);
  return avatars;
}

const WaitingRoom = ({ players:initialPlayers, socket, loggedPlayer }) => {
  const [players, setPlayers] = useState(initialPlayers); // lista de jugadores
  const [remainingTime, setRemainingTime] = useState(30); // en segundos
  const [startGame, setStartGame] = useState(false); // marca el inicio del juego cuando countdown = 0
  const [avatars, setAvatars] = useState([]); 

  //cargar los avatares cuando se monta el componente
  useEffect(() => {
    setAvatars(getAllAvatars());
  }, []);

  // Codigo de reemplazo de la simulacion de entrada de jugadores cuando sockets se implementen
  // useEffect(() => {
  //   const handler = (newPlayer) => {
  //     setPlayers((prev) => [...prev, newPlayer]);
  //   };
  //   socket.on("player-joined", handler);
  //   return () => socket.off("player-joined", handler);
  // }, [socket]);

  // Simulación de jugadores que se unen (reemplazar con socket.on en el futuro)
  // - Al montar el componente, se inicia un setInterval que corre cada 5 segundos.
  // - Si hay menos de 10 jugadores, se crea un jugador falso con un nombre y un avatar aleatorio.
  // - Ese nuevo jugador se añade a la lista de jugadores (setPlayers).
  // - Cuando el componente se desmonta o cambian players o avatars, el intervalo se limpia para evitar que siga funcionando en segundo plano.

  useEffect(
    function () {
      // Creamos un intervalo que se ejecuta cada 5 segundos (5000 milisegundos)
      var interval = setInterval(function () {

        // Solo añadimos jugadores si hay menos de 10
        if (players.length < 10) {

          // Creamos un jugador falso (simulado)
          var fakePlayer = {
            idPlayer: String(Date.now()), // ID único basado en la hora actual
            nick: "Player" + (players.length + 1),
            avatar: avatars[Math.floor(Math.random() * avatars.length)], // Avatar aleatorio
          };

          // Añadimos el jugador al estado
          setPlayers(function (prevPlayers) {
            return prevPlayers.concat(fakePlayer); // devolvemos una nueva lista con el jugador añadido
          });
        }
      }, 5000); // cada 5 segundos

      // Función de limpieza que se ejecuta si el componente se desmonta
      return function () {
        clearInterval(interval);
      };
    },
    // Lo hacemos depender de `players` o `avatars`
    [players, avatars]
  );

  // Temporizador de cuenta atrás para entrar al juego
  useEffect(function () {
    // Inicia un temporizador que se ejecuta cada 1000 milisegundos (1 segundo)
    let timer = setInterval(function () {
      // Usamos la función de actualización del estado para obtener el tiempo actual
      setRemainingTime(function (prev) {
        // Si el tiempo restante es menor o igual a 1 segundo...
        if (prev <= 1) {
          // ...detenemos el temporizador
          clearInterval(timer);
          // Iniciar el juego
          setStartGame(true);
        }

        // Devolvemos el nuevo tiempo restante (uno menos que el anterior)
        return prev - 1;
      });
    }, 1000);

    // Esta función se ejecuta cuando el componente se desmonta (limpieza del temporizador)
    return function () {
      clearInterval(timer);
    };
  }, []);

  // Receptor para cambio de avatar de otros jugadores (habilitar cuando se use WebSocket)
  // useEffect(() => {
  //   if (!socket) return;
  //   const handler = ({ idPlayer, newAvatar }) => {
  //     setPlayers((prev) =>
  //       prev.map((p) =>
  //         p.idPlayer === idPlayer ? { ...p, avatar: newAvatar } : p
  //       )
  //     );
  //   };
  // });

  // Cambiar el avatar del jugador que ha iniciado sesión
  // - handleAvatarChange recibe el nuevo avatar como argumento.
  // - Se llama a setPlayers para actualizar el estado con una nueva lista de jugadores.
  // - Dentro de map, se revisa cada jugador:
  // - Si su idPlayer coincide con el del jugador logueado, se devuelve una copia con el avatar cambiado.
  // - Si no coincide, se devuelve el jugador sin cambios.
  // - Al final, puedes emitir ese cambio al servidor usando WebSocket (comentado por ahora).
  function handleAvatarChange(newAvatar) {
    // Actualizamos la lista de jugadores
    setPlayers(function (prevPlayers) {
      // Creamos una nueva lista con los jugadores actualizados
      let updatedPlayers = prevPlayers.map(function (player) {
        // Si el jugador actual es el jugador logueado, cambiamos su avatar
        if (player.idPlayer === loggedPlayer.idPlayer) {
          // Creamos un nuevo objeto con el avatar cambiado
          return Object.assign({}, player, { avatar: newAvatar });
        } else {
          // Si no es el jugador logueado, lo dejamos igual
          return player;
        }
      });

      // Devolvemos la nueva lista de jugadores
      return updatedPlayers;
    });

    // En el futuro: enviar el cambio al servidor con WebSocket
    socket.emit('avatar-change', { idPlayer: loggedPlayer.idPlayer, newAvatar });
  }

  return (
    <>
      {!startGame ? (
        <div className="waiting-room">
          <h2>Waiting Room</h2>
          <WaitingList players={players} />
          <AvatarSelector
            avatars={avatars}
            currentAvatar={loggedPlayer.avatar}
            onAvatarSelect={handleAvatarChange}
          />
          <p>
            La partida comenzará en: {Math.floor(remainingTime / 60)}:
            {(remainingTime % 60).toString().padStart(2, "0")}
          </p>
        </div>
      ) : (
          <p>Inicio del juego</p>
        // <Game players={players} />
      )}
    </>
  );
};

export default WaitingRoom;




