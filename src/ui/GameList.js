import React from "react";
import { getGameStatus } from "./functions/GameHelpers";
import GameGroup from "./GameGroup";

function GameList({ games, province, groupMethod, activeCompany, setActiveCompany, userGames, setUserGames }) {
    const gameList = games.filter(game => !province || game.company.city.province.id === province);
    gameList.forEach(game => game.userStatus = getGameStatus(game, userGames));
    gameList.sort(groupMethod.sortfn);
    const groups = [...new Set(gameList.map(groupMethod.groupField))];
    groups.sort(groupMethod.sortgroup);
    return <div className="game-list">
        { groups.map((group, i) => <GameGroup key={`group-${i}`} group={group} interjeccion={groupMethod.interjeccion} games={gameList.filter(game => groupMethod.matcher(game, group))} activeCompany={activeCompany} setActiveCompany={setActiveCompany} userGames={userGames} setUserGames={setUserGames} />) }
    </div>;
}

export default GameList;