import React from "react";
import CompanyDetail from "./CompanyDetail";
import CompanyList from "./CompanyList";
import FilterPanel from "./FilterPanel";
import Summary from "./Summary";
function Panel({ markersData, userPreferences, activeCompany, setActiveCompany, activeProvince }) {
    /*
    return <div><ul>
    Markers data:
    {markersData.map(marker => (
      <li key={marker.id}>
        {marker.title}, lat: {marker.latLng.lat}, lng: {marker.latLng.lng},
      </li>
    ))}
  </ul></div>;
  */
 // 3 componentes
 // filtros
 // compañia activa
 // lista completa
    return <div style={{flexBasis: "25%"}}>
      <FilterPanel />
      {markersData && userPreferences && <Summary markersData={markersData} userPreferences={userPreferences} />}
      {activeCompany && <CompanyDetail company={activeCompany} />}
      {markersData && <CompanyList companies={markersData} province={activeProvince} />}
    </div>;
}
export default Panel;