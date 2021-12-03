import React from "react";

function ResetMapButton({ activeProvince, setActiveProvince }) {
    return <div className="map-reset-button" onClick={() => setActiveProvince(null)}>🧹 Salas en {activeProvince.split("-")[0]}</div>
}

export default ResetMapButton;