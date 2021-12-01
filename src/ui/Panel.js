import React from "react";
import CompanyDetail from "./CompanyDetail";
import CompanyList from "./CompanyList";
//import CompanySummary from "./CompanySummary";

function Panel({ companies, userGames, setUserGames, activeCompany, setActiveCompany, activeProvince }) {
 // filtros
 //{companies && <CompanySummary companies={companies} />}
    return <div className="panel">
      {companies && <CompanyList companies={companies} province={activeProvince} activeCompany={activeCompany} setActiveCompany={setActiveCompany} userGames={userGames} setUserGames={setUserGames} />}
    </div>;
}
export default Panel;