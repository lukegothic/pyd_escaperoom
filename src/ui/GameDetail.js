import React from "react";
import { updateRoom } from '../repositories/UserGamesRepository';
import EscapeRoomStatus, { EscapeRoomStatusIcon, EscapeRoomStatusText } from "../domains/EscapeRoomStatus";
import { getGameStatus } from "./functions/GameHelpers";

const iconByTheme = {
    misterio: "🔎",
    histórico: "📚",
    aventuras: "🏕️",
    adultos: "🔞",
    ficción: "🛸",
    criminal: "🔪",
    fantasía: "🔮",
    miedo: "😱",
    apocalíptico: "☢️",
    infantil: "👶"
};

function GameDetail({ game, userGames, setUserGames }) {
    const userGameStatus = getGameStatus(game, userGames);
    return <div className="company-game">
                <div className={`game-name game-status-${userGameStatus}`}><a href={`https://www.escaperoomlover.com/es/juego/${game.id}`} target="_blank" rel="noopener noreferrer" title="clic para visitar el juego en ERL">🧩 {game.name.es}</a></div>
                <div className="game-themes" title={game.themes.map(t => t.name.es).join(",")}>{game.themes.map(t => `${iconByTheme[t.name.es]}`).join(" ")}</div>
                <div className="game-players">{`👫 ${game.minGamer ? game.minGamer + "-" : ""}${game.maxGamer}` }</div>
                <div className="game-status">
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
                                    <label htmlFor={id} title={EscapeRoomStatusText[statusKey]} className={`label-status-selector-${statusKey}`}>{EscapeRoomStatusIcon[statusKey]}</label>
                                </div>;
                    }
                )}
                </div>
        </div>;
}

export default GameDetail;