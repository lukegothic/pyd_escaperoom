import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Map from "./Map";
import Panel from "./Panel";
import Wrapper from "./Wrapper";
import UserPreferencesRepository from "./repositories/UserPreferencesRepository";
import EscapeRoomRepository from "./repositories/EscapeRoomRepository";

function App() {
  const [markersData, setMarkersData] = useState(null);
  const [activeProvince, setActiveProvince] = useState(null);
  const [activeCompany, setActiveCompany] = useState(null);
  const [userPreferences, setUserPreferences] = useState(null);

  useEffect(() => {
    (async () => {
      const companies = await EscapeRoomRepository.get();
      console.log(companies);
      setMarkersData(companies);
      const userPreferences = await UserPreferencesRepository.get();
      setUserPreferences(userPreferences);
    })();
  }, []);

  return <Wrapper>
      <Map markersData={markersData} userPreferences={userPreferences} setActiveCompany={setActiveCompany} setActiveProvince={setActiveProvince} />
      <Panel markersData={markersData} activeCompany={activeCompany} setActiveCompany={setActiveCompany} activeProvince={activeProvince} />
  </Wrapper>;
}

render(<App />, document.getElementById("root"));
