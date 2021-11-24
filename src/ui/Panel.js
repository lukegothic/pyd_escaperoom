import React from "react";
import CompanyDetail from "./CompanyDetail";
import CompanyList from "./CompanyList";
import FilterPanel from "./FilterPanel";
import CompanySummary from "./CompanySummary";
import UserSummary from "./UserSummary";
function Panel({ companies, userGames, setUserGames, activeCompany, setActiveCompany, activeProvince }) {
 // filtros
    return <div style={{flexBasis: "25%"}}>
      <FilterPanel />
      {companies && <CompanySummary companies={companies} />}
      {userGames && <UserSummary companies={companies} userGames={userGames} />}
      {activeCompany && <CompanyDetail userGames={userGames} setUserGames={setUserGames} company={activeCompany} setActiveCompany={setActiveCompany} />}
      {companies && <CompanyList companies={companies} province={activeProvince} setActiveCompany={setActiveCompany} />}
    </div>;
}
export default Panel;