import React from "react";
import CompanyHeader from "./CompanyHeader";
import GameDetail from "./GameDetail";
function CompanyDetail({ company, userGames, setUserGames }) {
    return <div style={{backgroundColor: "rgba(0,0,0,0.1)"}}>
        <CompanyHeader company={company} />
        <div>
            {company.games.map(game => <GameDetail key={game.id} game={game} userGames={userGames} setUserGames={setUserGames} />)}
        </div>
    </div>;
}

export default CompanyDetail;