import React from "react";
import CompanyHeader from "./CompanyHeader";
import { GameCount } from "./functions/CompanyHelpers";
function CompanyList({ companies, province, setActiveCompany }) {
    const companyList = companies.filter(company => !province || company.city.province.id === province);
    return <div style={{height: "85%", overflow: "auto", backgroundColor: "rgba(50,100,50,0.2)"}}>Lista de salas ({`${companyList.length} salas con ${GameCount(companyList)} juegos`}{province && <span> en {province}</span>})
        <div>
            {companyList.map(company => <CompanyHeader key={company.id} company={company} compact={true} setActiveCompany={setActiveCompany} />)}
        </div>
    </div>;
}

export default CompanyList;