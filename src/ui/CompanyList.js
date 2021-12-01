import React, { useState } from "react";
import CompanyHeader from "./CompanyHeader";
import { GameCount } from "./functions/CompanyHelpers";
import FilterPanel from "./FilterPanel";
import CompanyDetail from "./CompanyDetail";

function CompanyList({ companies, province, activeCompany, setActiveCompany, userGames, setUserGames }) {
    const [groupMethod, setGroupMethod] = useState(null);
    const companyList = companies.filter(company => !province || company.city.province.id === province);
    return <div>
        <FilterPanel />
        <span>Lista de salas ({`${companyList.length} salas con ${GameCount(companyList)} juegos`}{province && <span> en {province}</span>})</span>
        <div>
            {companyList.map(company => <CompanyDetail key={company.id} company={company} activeCompany={activeCompany} compact={true} setActiveCompany={setActiveCompany} userGames={userGames} setUserGames={setUserGames} />)}
        </div>
    </div>;
}

export default CompanyList;