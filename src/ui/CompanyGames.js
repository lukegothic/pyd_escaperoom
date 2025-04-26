import React from "react";
import GameDetail from "./GameDetail";
import { sortBy } from "../_functions/arrays";

function CompanyGames({ company, userGames, setUserGames }) {
    sortBy(company.games, game => [game.name.es]);
    return <div className="company-games">
        {company.games.map(game => <GameDetail key={game.id} game={game} userGames={userGames} setUserGames={setUserGames} />)}
    </div>;
}
export default CompanyGames;
