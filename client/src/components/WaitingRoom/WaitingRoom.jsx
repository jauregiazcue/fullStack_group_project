import "./WaitingRoom.css";
import { useState } from "react";

function WaitingRoom({ webSocket }) {
  const { users, setUsers } = setState();

  //manejador cuando un usuario entra a la sala de espera
  const handleEntry = () => {
    webSocket.emit("entry");
  };

  return (
    <section className="waiting__container">
      <section className="waiting__section">
        <h1>Waiting Room</h1>
        <div className="waiting__users">
          {users.map((user) => {
            return (
              <div className="waiting__user">
                <WaitingUser
                  key={user.id}
                  user={user}
                  webSocket={webSocket}
                  setUsers={setUsers} />
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
}

export default WaitingRoom;
