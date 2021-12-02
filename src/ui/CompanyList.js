import React, { useState } from "react";
import CompanyHeader from "./CompanyHeader";
import { GameCount } from "./functions/CompanyHelpers";
import FilterPanel from "./FilterPanel";
import CompanyDetail from "./CompanyDetail";
import CompanyGroup from "./CompanyGroup";

const groupingMethods = {
    provincia: {
        type: "company",
        sortfn: (c1, c2) => c1.sort_rating > c2.sort_rating ? -1 : 1,
        groupField: (c) => c.city.province.name.es,
        matcher: (c, value) => c.city.province.name.es === value
    },
    puntuacion: {
        type: "company",
        sortfn: (a,b) => a-b,
    },
    tematica: {
        type: "game"
    },
    players: {
        type: "game"
    },
    status: {
        type: "game"
    }
};

function CompanyList({ companies, province, activeCompany, setActiveCompany, userGames, setUserGames }) {
    const [groupMethod, setGroupMethod] = useState(groupingMethods.provincia);
    const companyList = companies.filter(company => !province || company.city.province.id === province);
    companyList.sort(groupMethod.sortfn);
    const groups = [...new Set(companyList.map(groupMethod.groupField))];
    groups.sort((a, b) => a.localeCompare(b));
    console.log(groups);
    return <div className="list">
        { groups.map((g, i) => <CompanyGroup key={`group-${i}`} group={g} companies={companyList.filter(c => groupMethod.matcher(c, g))} activeCompany={activeCompany} setActiveCompany={setActiveCompany} userGames={userGames} setUserGames={setUserGames} />) }
    </div>;
    /*
    return <div>
        <FilterPanel />
        <span>Lista de salas ({`${companyList.length} salas con ${GameCount(companyList)} juegos`}{province && <span> en {province}</span>})</span>
        <div>
            {companyList.map(company => <CompanyDetail key={company.id} company={company} activeCompany={activeCompany} setActiveCompany={setActiveCompany} userGames={userGames} setUserGames={setUserGames} />)}
        </div>
    </div>;
    */
}

export default CompanyList;