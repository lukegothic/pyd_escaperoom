import React from "react";
import CompanyDetail from "./CompanyDetail";
import CompanyList from "./CompanyList";
import FilterPanel from "./FilterPanel";
import CompanySummary from "./CompanySummary";
import UserSummary from "./UserSummary";
function Panel({ markersData, userGames, activeCompany, setActiveCompany, activeProvince }) {
 // 3 componentes
 // filtros
 // compañia activa
 // lista completa
    return <div style={{flexBasis: "25%"}}>
      <FilterPanel />
      {markersData && <CompanySummary markersData={markersData} />}
      {userGames && <UserSummary userGames={userGames} />}
      {activeCompany && <CompanyDetail company={activeCompany} setActiveCompany={setActiveCompany} />}
      {markersData && <CompanyList companies={markersData} province={activeProvince} setActiveCompany={setActiveCompany} />}
    </div>;
}
export default Panel;