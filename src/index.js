import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Map from "./ui/Map";
import Panel from "./ui/Panel";
import Wrapper from "./ui/Wrapper";
import EscapeRoomRepository from "./repositories/EscapeRoomRepository";
import { getRooms } from "./repositories/UserGamesRepository";

function App() {
    const [companies, setCompanies] = useState(null);
    const [activeProvince, setActiveProvince] = useState(null);
    const [activeCompany, setActiveCompany] = useState(null);
    const [userGames, setUserGames] = useState(null);

    useEffect(() => {
        (async () => {
            const companies = await EscapeRoomRepository.get();
            setCompanies(companies);
            const dbUserGames = await getRooms();
            setUserGames(dbUserGames);
            console.log(companies, dbUserGames);
        })();
    }, []);

    return <Wrapper>
        <Map
            companies={companies}
            userGames={userGames}
            activeCompany={activeCompany}
            setActiveCompany={setActiveCompany}
            activeProvince={activeProvince}
            setActiveProvince={setActiveProvince} />
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
