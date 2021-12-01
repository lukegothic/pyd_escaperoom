import React from "react";
import { updateRoom } from '../repositories/UserGamesRepository';
import EscapeRoomStatus, { EscapeRoomStatusIcon, EscapeRoomStatusText } from "../domains/EscapeRoomStatus";

function GameDetail({ game, userGames, setUserGames }) {
    const userGameStatus = userGames && game.id in userGames ? userGames[game.id].status : EscapeRoomStatus.NOT_PLAYED;
    return <div className="company-game">
                <div className="game-name">🧩 {game.name.es}</div>
                <div style={{ display: "flex" }}>
                    {Object.keys(EscapeRoomStatus).map(status => {
                        const statusKey = EscapeRoomStatus[status];
                        const id = `${game.id}-${statusKey}`;
                        return <div key={id} className="label-radio-cool">
                                    <input
                                        id={id}
                                        checked={userGameStatus === statusKey}
                                        type="radio"
                                        name={game.id}
                                        onChange= {() => updateRoom(game.id, statusKey).then(() => setUserGames({ ...userGames, [game.id]: { status: EscapeRoomStatus[status], finished: true } }))} />
                                    <label htmlFor={id} title={EscapeRoomStatusText[statusKey]}>{EscapeRoomStatusIcon[statusKey]}</label>
                                </div>;
                    }
                )}
                </div>
        </div>;
}

export default GameDetail;