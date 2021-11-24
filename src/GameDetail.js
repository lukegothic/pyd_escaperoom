import React from "react";
import { updateRoom } from './repositories/UserGamesRepository';
import EscapeRoomStatus, { EscapeRoomStatusText } from "./domains/EscapeRoomStatus";

function GameDetail({ game }) {
    // TODO: LOAD STATE
    return <div>
        <div>{game.name.es}</div>
        <div>
            {Object.keys(EscapeRoomStatus).map(status => 
                <label key={EscapeRoomStatus[status]}><input type="radio" name={game.id} onChange={() => updateRoom(game.id, EscapeRoomStatus[status])} />{EscapeRoomStatusText[EscapeRoomStatus[status]]}</label>
        )}
        </div>
    </div>;
}

export default GameDetail;