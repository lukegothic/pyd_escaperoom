import React, { useState } from "react";
import CompanyList from "./CompanyList";
import FilterPanel from "./FilterPanel";
import { GetCompanyRooms } from "./functions/CompanyHelpers";
import GameList from "./GameList";

const getCompanyRating = (c) => c.rating ? c.rating : "ninguna review";
const getGameMinPlayers = (g) => g.minGamer ? g.minGamer : g.maxGamer;
const getGameTheme = (g) => g.themes && g.themes.length > 0 ? g.themes[0].name.es : "(sin temática)";

// TODO: por estado (agregar datos usuario y compania a GAMES)
const groupingMethods = [{
      id: "provincia",
      type: "company",
      interjeccion: " en ",
      icon: "🗺️",
      name: "provincia",
      sortgroup: (a, b) => a.localeCompare(b),

      sortfn: (c1, c2) => c1.sort_rating > c2.sort_rating ? -1 : 1,
      groupField: (c) => c.city.province.name.es,
      matcher: (c, value) => c.city.province.name.es === value
  }, {
      id: "puntuacion",
      type: "company",
      interjeccion: " con ",
      icon: "💯",
      name: "puntuación",
      sortgroup: (a, b) => b - a,

      sortfn: (c1, c2) => c1.sort_rating > c2.sort_rating ? -1 : 1,
      groupField: (c) => getCompanyRating(c),
      matcher: (c, value) => getCompanyRating(c) === value
  }, {
    id: "jugadores",
    type: "game",
    interjeccion: " para ",
    icon: "👫",
    name: "jugadores",
    sortgroup: (a, b) => a - b,

    sortfn: (g1, g2) => g1.maxGamer - g2.maxGamer,
    groupField: (g) => getGameMinPlayers(g),
    matcher: (g, value) => getGameMinPlayers(g) === value
  }, {
    id: "estado",
    type: "game",
    interjeccion: "",
    icon: "⏳",
    name: "estado",
    sortgroup: (a, b) => b - a,

    sortfn: (g1, g2) => g1.sort_rating > g2.sort_rating ? -1 : 1,
    groupField: (g) => g.rating ? g.rating : "ninguna review",
    matcher: (c, value) => c.rating === value || !c.rating && value === "ninguna review"
  }, {
    id: "tematica",
    type: "game",
    interjeccion: " de temática ",
    icon: "📓",
    name: "temática",
    sortgroup: (a, b) => a.localeCompare(b),

    sortfn: (g1, g2) => (getGameMinPlayers(g1) + g1.maxGamer) - (getGameMinPlayers(g2) + g2.maxGamer),
    groupField: (g) => getGameTheme(g),
    matcher: (g, value) => getGameTheme(g) === value
  }
];

function Panel({ companies, userGames, setUserGames, activeCompany, setActiveCompany, activeProvince }) {
  const [groupMethod, setGroupMethod] = useState(groupingMethods[0]);
  return <div className="panel">
    <FilterPanel groupingMethods={groupingMethods} groupMethod={groupMethod} setGroupMethod={setGroupMethod} />
    <div className="panel-splitted">
      <div></div>
      {companies && groupMethod.type === "company" && <CompanyList groupMethod={groupMethod} companies={companies} province={activeProvince} activeCompany={activeCompany} setActiveCompany={setActiveCompany} userGames={userGames} setUserGames={setUserGames} />}
      {companies && groupMethod.type === "game" && <GameList groupMethod={groupMethod} games={GetCompanyRooms(companies)} province={activeProvince} activeCompany={activeCompany} setActiveCompany={setActiveCompany} userGames={userGames} setUserGames={setUserGames} />}
    </div>
  </div>;
}
export default Panel;