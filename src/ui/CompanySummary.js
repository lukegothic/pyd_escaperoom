import React from "react";
import { GameCount } from "./functions/CompanyHelpers";
function CompanySummary({ companies }) {
    return <div style={{backgroundColor:"rgba(200,100,50,0.1)"}}>Hay un total de {GameCount(companies)} juegos en {companies.length} salas de España</div>;
}
export default CompanySummary;