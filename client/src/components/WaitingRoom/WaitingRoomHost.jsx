import { useState, useEffect } from "react";
import WaitingList from "./WaitingList";

function WaitingRoomHost({ game, hostData, onRemove}) {


    return (
        <>
            <h1>{game.title}</h1>
            <WaitingList players={game.players} gameCode={game.code} onRemove={onRemove}/>
        </>
    );
}