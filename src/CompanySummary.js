import React from "react";
import { GameCount } from "./functions/CompanyHelpers";
function CompanySummary({ markersData }) {
    return <div>Hay un total de {GameCount(markersData)} salas en España creadas por {markersData.length} empresas.</div>;
}
export default CompanySummary;