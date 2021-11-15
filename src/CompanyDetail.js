import React from "react";
import CompanyHeader from "./CompanyHeader";
import GameDetail from "./GameDetail";
function CompanyDetail({ company }) {
    return <div>
        <CompanyHeader company={company} />
        <div>
            {company.games.map(game => <GameDetail key={game.id} game={game} />)}
        </div>
    </div>;
}

export default CompanyDetail;