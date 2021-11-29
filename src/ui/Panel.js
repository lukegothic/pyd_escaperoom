import React from "react";
import CompanyDetail from "./CompanyDetail";
import CompanyList from "./CompanyList";
//import CompanySummary from "./CompanySummary";

function Panel({ companies, userGames, setUserGames, activeCompany, setActiveCompany, activeProvince }) {
 // filtros
 //{companies && <CompanySummary companies={companies} />}
    return <div style={{flexBasis: "30%", height: "100%", overflow:"auto"}}>
      {activeCompany && <CompanyDetail userGames={userGames} setUserGames={setUserGames} company={activeCompany} setActiveCompany={setActiveCompany} />}
      {companies && <CompanyList companies={companies} province={activeProvince} setActiveCompany={setActiveCompany} />}
    </div>;
}
export default Panel;