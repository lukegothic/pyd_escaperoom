import React from "react";
import CompanyGames from "./CompanyGames";
import CompanyHeader from "./CompanyHeader";

function CompanyDetail({ company, userGames, setUserGames, activeCompany, setActiveCompany }) {
    return <div className="company-detail">
        <CompanyHeader company={company} setActiveCompany={setActiveCompany} />
        { activeCompany && activeCompany.id === company.id && <CompanyGames company={company} userGames={userGames} setUserGames={setUserGames} /> }
    </div>;
}

export default CompanyDetail;