import React from "react";
import CompanyList from "./CompanyList";

function Panel({ companies, userGames, setUserGames, activeCompany, setActiveCompany, activeProvince }) {
 // filtros
    return <div className="panel">
      {companies && <CompanyList companies={companies} province={activeProvince} activeCompany={activeCompany} setActiveCompany={setActiveCompany} userGames={userGames} setUserGames={setUserGames} />}
    </div>;
}
export default Panel;