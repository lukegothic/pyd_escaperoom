import React, { useState } from "react";
import CompanyHeader from "./CompanyHeader";
import { GameCount } from "./functions/CompanyHelpers";
import FilterPanel from "./FilterPanel";

function CompanyList({ companies, province, setActiveCompany }) {
    const [groupMethod, setGroupMethod] = useState(null);
    const companyList = companies.filter(company => !province || company.city.province.id === province);
    return <div>
        <FilterPanel />
        <span>Lista de salas ({`${companyList.length} salas con ${GameCount(companyList)} juegos`}{province && <span> en {province}</span>})</span>
        <div>
            {companyList.map(company => <CompanyHeader key={company.id} company={company} compact={true} setActiveCompany={setActiveCompany} />)}
        </div>
    </div>;
}

export default CompanyList;