import React from "react";
import { GameCount } from "./functions/CompanyHelpers";
function CompanySummary({ markersData }) {
    return <div>Hay un total de {markersData.length} salas en España con un total de {GameCount(markersData)} juegos.</div>;
}
export default CompanySummary;