import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Map from "./Map";
import Panel from "./Panel";
import Wrapper from "./Wrapper";
import { } from "./repositories/UserPreferencesRepository";
import EscapeRoomRepository from "./repositories/EscapeRoomRepository";
import { getRooms } from "./repositories/UserGamesRepository";

function App() {
    const [markersData, setMarkersData] = useState(null);
    const [activeProvince, setActiveProvince] = useState(null);
    const [activeCompany, setActiveCompany] = useState(null);
    const [userGames, setUserGames] = useState(null);

    useEffect(() => {
        (async () => {
            const companies = await EscapeRoomRepository.get();
            console.log(companies);
            setMarkersData(companies);
            const dbUserGames = await getRooms();
            setUserGames(dbUserGames);
        })();
    }, []);

    return <Wrapper>
        <Map
            markersData={markersData}
            userGames={userGames}
            setActiveCompany={setActiveCompany}
            setActiveProvince={setActiveProvince} />
        <Panel
            markersData={markersData}
            userGames={userGames}
            activeCompany={activeCompany}
            setActiveCompany={setActiveCompany}
            activeProvince={activeProvince} />
    </Wrapper>;
}

render(<App />, document.getElementById("root"));
