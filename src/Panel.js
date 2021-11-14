import React from "react";
function Panel({ markersData, activeCompany, setActiveCompany, activeProvince }) {
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
      {markersData && markersData.length}
      {activeProvince && activeProvince}
      {activeCompany && activeCompany}
    </div>;
}
export default Panel;