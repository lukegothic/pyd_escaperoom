import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Map from "./ui/Map";
import Panel from "./ui/Panel";
import Wrapper from "./ui/Wrapper";
import EscapeRoomRepository from "./repositories/EscapeRoomRepository";
import { getRooms } from "./repositories/UserGamesRepository";
import MapHud from "./ui/MapHud";
//import {ThemeProvider} from "styled-components"

function App() {
    const [companies, setCompanies] = useState(null);
    const [activeProvince, setActiveProvince] = useState(null);
    const [activeCompany, setActiveCompany] = useState(null);
    const [userGames, setUserGames] = useState(null);
    const [mapData, setMapData] = useState(null);

    useEffect(() => {
        (async () => {
            const companies = await EscapeRoomRepository.get();
            const dbUserGames = await getRooms();
            setCompanies(companies);
            setUserGames(dbUserGames);
            setMapData({ companies, userGames: dbUserGames });
            console.log(companies, dbUserGames);
        })();
    }, []);

    return <Wrapper>
        <Map
            mapData={mapData}
            userGames={userGames}
            activeCompany={activeCompany}
            setActiveCompany={setActiveCompany}
            activeProvince={activeProvince}
            setActiveProvince={setActiveProvince} />
        { userGames && companies && <MapHud companies={companies} userGames={userGames} /> }
        <Panel
            companies={companies}
            userGames={userGames}
            setUserGames={setUserGames}
            activeCompany={activeCompany}
            setActiveCompany={setActiveCompany}
            activeProvince={activeProvince} />
    </Wrapper>;
}

render(<App />, document.getElementById("root"));
