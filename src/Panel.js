import React from "react";
function Panel({ markersData }) {
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
    return <div style={{flexBasis: "25%"}}>{markersData && markersData.length}</div>;
}
export default Panel;