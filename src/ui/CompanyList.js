import React from "react";
import CompanyGroup from "./CompanyGroup";

function CompanyList({ groupMethod, companies, province, activeCompany, setActiveCompany, userGames, setUserGames }) {
    const companyList = companies.filter(company => !province || company.city.province.id === province);
    companyList.sort(groupMethod.sortfn);
    const groups = [...new Set(companyList.map(groupMethod.groupField))];
    groups.sort(groupMethod.sortgroup);
    return <div className="company-list">
        { groups.map((g, i) => <CompanyGroup key={`group-${i}`} group={g} interjeccion={groupMethod.interjeccion} companies={companyList.filter(c => groupMethod.matcher(c, g))} activeCompany={activeCompany} setActiveCompany={setActiveCompany} userGames={userGames} setUserGames={setUserGames} />) }
    </div>;
}

export default CompanyList;