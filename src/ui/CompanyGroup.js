import React from "react";
import CompanyDetail from "./CompanyDetail";

function CompanyGroup({ group, companies, activeCompany, setActiveCompany, userGames, setUserGames }) {
    return <div className="group">
        <div className="group-title">{group}</div>
        {companies.map(company => <CompanyDetail key={company.id} company={company} activeCompany={activeCompany} setActiveCompany={setActiveCompany} userGames={userGames} setUserGames={setUserGames} />)}
    </div>;
}

export default CompanyGroup;