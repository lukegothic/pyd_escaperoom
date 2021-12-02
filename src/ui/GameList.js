import React, { useEffect } from "react";
import GameGroup from "./GameGroup";

function GameList({ games, province, groupMethod, activeCompany, setActiveCompany, userGames, setUserGames }) {
    console.log(games, groupMethod);
    // TODO: filtrar por provincia, usar datos compania
    //const gameList = games.filter(company => !province || company.city.province.id === province);
    // TODO: reset scroll
    //useEffect(() => , []);
    const gameList = games;
    gameList.sort(groupMethod.sortfn);
    const groups = [...new Set(gameList.map(groupMethod.groupField))];
    groups.sort(groupMethod.sortgroup);
    return <div className="game-list">
        { groups.map((group, i) => <GameGroup key={`group-${i}`} group={group} interjeccion={groupMethod.interjeccion} games={gameList.filter(game => groupMethod.matcher(game, group))} activeCompany={activeCompany} setActiveCompany={setActiveCompany} userGames={userGames} setUserGames={setUserGames} />) }
    </div>;
}

export default GameList;