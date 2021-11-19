import React from "react";
import { updateRoom } from './repositories/UserGamesRepository';
import EscapeRoomStatus, { EscapeRoomStatusText } from "./domains/EscapeRoomStatus";

function GameDetail({ game }) {
    // TODO: LOAD STATE
    return <div>
        <div>{game.name.es}</div>
        <div>
            {Object.keys(EscapeRoomStatus).map(status => 
                <label key={status}><input type="radio" name={game.id} onChange={() => updateRoom(game.id, EscapeRoomStatus[status])} />{EscapeRoomStatusText[status]}</label>
        )}
        </div>
    </div>;
}

export default GameDetail;