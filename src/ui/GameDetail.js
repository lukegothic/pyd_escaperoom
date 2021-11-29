import React from "react";
import { updateRoom } from '../repositories/UserGamesRepository';
import EscapeRoomStatus, { EscapeRoomStatusIcon, EscapeRoomStatusText } from "../domains/EscapeRoomStatus";

function GameDetail({ game, userGames, setUserGames }) {
    const userGameStatus = game.id in userGames ? userGames[game.id].status : EscapeRoomStatus.NOT_PLAYED;
    return <div><span style={{ width: "40px" }}>{game.name.es}</span>
            {Object.keys(EscapeRoomStatus).map(status => {
                const statusKey = EscapeRoomStatus[status];
                return <label key={statusKey} title={EscapeRoomStatusText[statusKey]}>
                            <input
                                checked={userGameStatus === statusKey}
                                type="radio"
                                name={game.id}
                                onChange= {() => updateRoom(game.id, statusKey).then(() => setUserGames({ ...userGames, [game.id]: { status: EscapeRoomStatus[status], finished: true } }))} />
                            {EscapeRoomStatusIcon[statusKey]}
                        </label>
            }
        )}
        </div>;
}

export default GameDetail;