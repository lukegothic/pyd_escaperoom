import React, { useState } from "react";
import CompanyList from "./CompanyList";
import FilterPanel from "./FilterPanel";

const groupingMethods = [{
      id: "provincia",
      type: "company",
      interjeccion: "en",
      icon: "🗺️",
      name: "provincia",
      sortfn: (c1, c2) => c1.sort_rating > c2.sort_rating ? -1 : 1,
      groupField: (c) => c.city.province.name.es,
      sortgroup: (a, b) => a.localeCompare(b),
      matcher: (c, value) => c.city.province.name.es === value
  }, {
      id: "puntuacion",
      type: "company",
      interjeccion: "con",
      icon: "💯",
      name: "puntuación",
      sortfn: (c1, c2) => c1.sort_rating > c2.sort_rating ? -1 : 1,
      groupField: (c) => c.rating ? c.rating : "ninguna review",
      sortgroup: (a, b) => b - a,
      matcher: (c, value) => c.rating === value || !c.rating && value === "ninguna review"
  }
];

function Panel({ companies, userGames, setUserGames, activeCompany, setActiveCompany, activeProvince }) {
  const [groupMethod, setGroupMethod] = useState(groupingMethods[0]);
  return <div className="panel">
    <FilterPanel groupingMethods={groupingMethods} groupMethod={groupMethod} setGroupMethod={setGroupMethod} />
    {companies && <CompanyList groupMethod={groupMethod} companies={companies} province={activeProvince} activeCompany={activeCompany} setActiveCompany={setActiveCompany} userGames={userGames} setUserGames={setUserGames} />}
  </div>;
}
export default Panel;