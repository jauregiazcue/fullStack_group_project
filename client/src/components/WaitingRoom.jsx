import WaitingList from "./WaitingList";
import AvatarSelector from "./AvatarSelector";
import React, { useEffect, useState } from 'react';

const WaitingRoom = ({ players: initialPlayers, avatars, socket, loggedPlayer }) => {
  const [players, setPlayers] = useState(initialPlayers);
  const [remainingTime, setRemainingTime] = useState(30); // en segundos

  // Simulación de jugadores que se unen (reemplazar con socket.on en el futuro)
  // useEffect(() => {
  //   socket.on("player-joined", (newPlayer) => {
  //     setPlayers((prev) => [...prev, newPlayer]);
  //   });
  // }, [socket]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (players.length < 6) {
        const fakePlayer = {
          idPlayer: `bot-${Date.now()}`,
          nick: `Player${players.length + 1}`,
          avatar: avatars[Math.floor(Math.random() * avatars.length)],
        };
        setPlayers(prev => [...prev, fakePlayer]);
      }
    }, 5000); // cada 5 segundos
    return () => clearInterval(interval);
  }, [players, avatars]);


  // Temporizador de cuenta atrás para entrar al juego
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Aquí se debería pasar a la pantalla de juego
          // navigate('/game') 
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);


  // Receptor para cambio de avatar de otros jugadores (habilitar cuando se use WebSocket)
  // useEffect(() => {
  //   if (!socket) return;
  //   const handler = ({ playerId, newAvatar }) => {
  //     setPlayers((prev) =>
  //       prev.map((p) => (p.id === playerId ? { ...p, avatar: newAvatar } : p))
  //     );
  //   };


  // Cambiar avatar del jugador logueado
  const handleAvatarChange = (newAvatar) => {
    setPlayers((prev) =>
      prev.map((player) =>
        player.idPlayer === loggedPlayer.idPlayer
          ? { ...player, avatar: newAvatar }
          : player
      )
    );
    // Emitir cambio de avatar al servidor cuando se use WebSocket
    // socket.emit('avatar-change', { playerId: loggedPlayer.id, newAvatar });
  };


  return (
    <div className="waiting-room">
      <h2>Waiting Room</h2>
      <WaitingList players={players} />
      <AvatarSelector
        avatars={avatars}
        currentAvatar={loggedPlayer.avatar}
        onAvatarSelect={handleAvatarChange}
      />
      <p>La partida comenzará en: {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}</p>
    </div>
  );

};

export default WaitingRoom;




