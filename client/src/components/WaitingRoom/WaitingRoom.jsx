import WaitingList from "./WaitingList";
import AvatarSelector from "./AvatarSelector";
import { useEffect, useState } from 'react';
// import Game from "../pages/Game";

const MAXPLAYERS = 10; 

function getAllAvatars() {
  const avatars = [];
  for (let i = 0; i < MAXPLAYERS; i++) {
    const index = String(i + 1).padStart(2, "0");
    const avatarUrl = `/src/assets/avatars/avatar (${index}).svg`;
    avatars.push({
      idAvatar: i,
      used: (i==0), //Al loggedPlayer le asigno el primer avatar, mientras no implemente socket. MODIFICABLE
      avatarUrl: avatarUrl
    });
  }
  return avatars;
}

const WaitingRoom = ({ players: initialPlayers, socket, loggedPlayer }) => {
  
  const [players, setPlayers] = useState(initialPlayers); // lista de jugadores
  const [remainingTime, setRemainingTime] = useState(30); // en segundos, aumentar a 120 en juego real
  const [startGame, setStartGame] = useState(false); // flag de inicio del juego cuando remainingTime = 0
  const [avatars, setAvatars] = useState([]);

  //cargar los avatares cuando se monta el componente
  useEffect(() => {
    setAvatars(getAllAvatars());
  }, []);

  //BORRABLE
  // Simulación de jugadores que se unen (reemplazar con socket.on en el futuro)
  useEffect(
    function () {
      let interval = setInterval(function () {
        if (players.length < MAXPLAYERS) {
          // Crear un jugador falso (simulado)
          let fakePlayer = {
            idPlayer: players.length + 1,
            nick: "Player" + (players.length + 1),
            avatar: null
          };

          //asignar un avatar no usado aún si hay disponibles
          if (players.length < MAXPLAYERS) {
            while (!fakePlayer.avatar || fakePlayer.avatar.used) {
              fakePlayer.avatar = avatars[Math.floor(Math.random() * avatars.length)]; // Asignar un avatar aleatorio (avatar)
            }
            //marcar avatar como usado
            fakePlayer.avatar.used = true;
          }

          // Añadimos el jugador al estado
          setPlayers(function (prevPlayers) {
            return prevPlayers.concat(fakePlayer); // devolvemos una nueva lista con el jugador añadido
          });
        }
      }, 5000); // cada 5 segundos

      return function () {
        clearInterval(interval);
      };
    },
    [players, avatars]
  );


  // Temporizador de cuenta atrás para entrar al juego
  useEffect(function () {
    let timer = setInterval(function () {
      setRemainingTime(function (prev) {
        if (prev <= 1) {
          clearInterval(timer);
          setStartGame(true);
        }
        return prev - 1;
      });
    }, 1000);

    // Esta función se ejecuta cuando el componente se desmonta (limpieza del temporizador)
    return function () {
      clearInterval(timer);
    };
  }, []);


  // Cambiar el avatar del jugador que ha iniciado sesión
  function handleAvatarChange(newAvatar) {

    // Evitar que se seleccione un avatar en uso
    if (newAvatar.used) {
      console.log("Avatar en uso.");
      //TODO:aqui se podria cambiar el estilo css para que se vea que no se puede elegir.
      return;
    }

    setPlayers(function (prevPlayers) {
      let updatedPlayers = prevPlayers.map(function (player) {
        if (player.idPlayer === loggedPlayer.idPlayer) {

          // Guardar el avatar anterior para liberarlo
          const previousAvatar = player.avatar;

          // Actualizar avatares: liberar el anterior y marcar como usado el nuevo
          setAvatars((prevAvatars) =>
            prevAvatars.map((avatar) => {
              if (previousAvatar && avatar.idAvatar === previousAvatar.idAvatar) {
                return { ...avatar, used: false };
              }
              if (avatar.idAvatar === newAvatar.idAvatar) {
                return { ...avatar, used: true };
              }
              return avatar;
            })
          );

          // Devolver el jugador con su nuevo avatar
          return { ...player, avatar: newAvatar };
        } else {
          return player;
        }
      });

      return updatedPlayers;
    });

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




