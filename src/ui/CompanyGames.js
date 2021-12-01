import React from "react";
import GameDetail from "./GameDetail";
function CompanyGames({ company, userGames, setUserGames }) {
    return <div className="company-games">
        {company.games.map(game => <GameDetail key={game.id} game={game} userGames={userGames} setUserGames={setUserGames} />)}
    </div>;
}
export default CompanyGames;
