import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Map from "./ui/Map";
import Panel from "./ui/Panel";
import Wrapper from "./ui/Wrapper";
import EscapeRoomRepository from "./repositories/EscapeRoomRepository";
import { getRooms } from "./repositories/UserGamesRepository";
import MapHud from "./ui/MapHud";
import { padLeft } from "./ui/functions/utils";
import UserPreferencesRepository from "./repositories/UserPreferencesRepository";

function App() {
    const up = UserPreferencesRepository.get();
    // TODO: restaurar preferencias usuario (provincia y agrupacion)
    const [companies, setCompanies] = useState(null);
    const [activeProvince, setActiveProvince] = useState(null);
    const [activeCompany, setActiveCompany] = useState(null);
    const [userGames, setUserGames] = useState(null);
    const [mapData, setMapData] = useState(null);

    useEffect(() => {
        (async () => {
            const companies = await EscapeRoomRepository.get();
            const dbUserGames = await getRooms();
            companies.forEach(c => c.sort_rating = `${padLeft(c.rating * 10, 2, "0")}_${padLeft(c.opinion_count, 8, "0")}`);
            setCompanies(companies);
            setUserGames(dbUserGames);
            setMapData({ companies, userGames: dbUserGames });
            console.log(companies, dbUserGames);
        })();
    }, []);

    useEffect(() => {
        UserPreferencesRepository.set({ provincia: activeProvince });
    }, [activeProvince]);
    return <Wrapper>
        <Map
            mapData={mapData}
            userGames={userGames}
            activeCompany={activeCompany}
            setActiveCompany={setActiveCompany}
            activeProvince={activeProvince}
            setActiveProvince={setActiveProvince} />
        { userGames && companies && <MapHud companies={companies} userGames={userGames} activeProvince={activeProvince} setActiveProvince={setActiveProvince} /> }
        { <Panel
            companies={companies}
            userGames={userGames}
            setUserGames={setUserGames}
            activeCompany={activeCompany}
            setActiveCompany={setActiveCompany}
            activeProvince={activeProvince} /> }
    </Wrapper>;
}

render(<App />, document.getElementById("root"));
