import React from "react";
import ResetMapButton from "./ResetMapButton";
import UserSummary from "./UserSummary";

function MapHud({ companies, userGames, activeProvince, setActiveProvince }) {
    return <div style={{ position:"absolute", zIndex: 1000, right: "42%", top: "5px" }}>
        <UserSummary companies={companies} userGames={userGames} />
        {activeProvince && <ResetMapButton activeProvince={activeProvince} setActiveProvince={setActiveProvince} />}
    </div>;
}

export default MapHud;