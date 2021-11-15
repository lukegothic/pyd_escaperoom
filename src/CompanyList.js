import React from "react";
import CompanyDetail from "./CompanyDetail";
import CompanyHeader from "./CompanyHeader";
import { GameCount } from "./functions/CompanyHelpers";
function CompanyList({ companies, province, setActiveCompany }) {
    const companyList = companies.filter(company => !province || company.city.province.id === province);
    return <div style={{height: "85%", overflow: "auto"}}>Lista de salas{province && <span> en {province}</span>} ({companyList.length} con {GameCount(companyList)} juegos)
        <div>
            {companyList.map(company => <CompanyHeader key={company.id} company={company} compact={true} setActiveCompany={setActiveCompany} />)}
        </div>
    </div>;
}

export default CompanyList;