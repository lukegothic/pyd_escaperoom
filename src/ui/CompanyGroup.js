import React from "react";
import CompanyDetail from "./CompanyDetail";
import { GameCount } from "./functions/CompanyHelpers";
import { sortBy } from "../_functions/arrays";

function CompanyGroup({ group, interjeccion, companies, activeCompany, setActiveCompany, userGames, setUserGames }) {
    sortBy(companies, c => [c.name]);
    return <div className="group">
        <div className="group-title">Salas {interjeccion} {group} ({companies.length} salas con {GameCount(companies)} juegos)</div>
        {companies.map(company => <CompanyDetail key={company.id} company={company} activeCompany={activeCompany} setActiveCompany={setActiveCompany} userGames={userGames} setUserGames={setUserGames} />)}
    </div>;
}

export default CompanyGroup;