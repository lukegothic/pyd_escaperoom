import React from "react";
import GameDetail from "./GameDetail";
import { sortBy } from "../_functions/arrays";

function GameGroup({ group, interjeccion, games, activeCompany, setActiveCompany, userGames, setUserGames }) {
    sortBy(games, game => [game.name.es]);
    return <div>
        <div className="group-title">Juegos {interjeccion} {group} ({games.length} juegos)</div>
        <div className="game-group">
            { games.map((game, i) => <GameDetail key={`game_detail_${game.id}`} game={game} activeCompany={activeCompany} setActiveCompany={setActiveCompany} userGames={userGames} setUserGames={setUserGames} />) }
        </div>
    </div>;
}

export default GameGroup;