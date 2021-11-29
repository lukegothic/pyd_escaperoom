import React from "react";
import UserSummary from "./UserSummary";

function MapHud({ companies, userGames }) {
    return <UserSummary companies={companies} userGames={userGames} />
}

export default MapHud;