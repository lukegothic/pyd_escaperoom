import React from "react";
import CompanyDetail from "./CompanyDetail";
import { GameCount } from "./functions/CompanyHelpers";
function CompanyList({ companies, province }) {
    const companyList = companies.filter(company => !province || company.city.province.id === province);
    return <div style={{height: "85%", overflow: "auto"}}>Lista de empresas{province && <span> en {province}</span>} ({companyList.length} con {GameCount(companyList)} salas)
        <div>
            {companyList.map(company => <CompanyDetail key={company.id} company={company} compact={true} />)}
        </div>
    </div>;
}

export default CompanyList;