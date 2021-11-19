import React from "react";
import { GameCount } from "./functions/CompanyHelpers";
function CompanySummary({ markersData }) {
    return <div style={{backgroundColor:"rgba(200,100,50,0.1)"}}>Hay un total de {GameCount(markersData)} juegos en {markersData.length} salas de España</div>;
}
export default CompanySummary;