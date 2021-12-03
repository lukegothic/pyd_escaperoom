import React, { useState, useEffect } from "react";
import { EscapeRoomStatusText } from "../domains/EscapeRoomStatus";
import CompanyList from "./CompanyList";
import FilterPanel from "./FilterPanel";
import { GetCompanyRooms } from "./functions/CompanyHelpers";
import GameList from "./GameList";

const getCompanyRating = (c) => c.rating ? c.rating : "ninguna review";
const getGameMinPlayers = (g) => g.minGamer ? g.minGamer : g.maxGamer;
const getGameTheme = (g) => g.themes && g.themes.length > 0 ? g.themes[0].name.es : "(sin temática)";
const SortedStatus = [1, 2, 3, 0];

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
    interjeccion: " que ",
    icon: "⏳",
    name: "estado",
    sortgroup: (a, b) => b - a,

    sortfn: (g1, g2) => SortedStatus[g2.userStatus] - SortedStatus[g1.userStatus],
    groupField: (g) => EscapeRoomStatusText[g.userStatus],
    matcher: (g, value) => EscapeRoomStatusText[g.userStatus] === value
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
  useEffect(() => {
    const list = document.querySelector(".company-list, .game-list");
    list && (list.scrollTop = 0);
  }, [groupMethod]);
  return <div className="panel">
    <FilterPanel groupingMethods={groupingMethods} groupMethod={groupMethod} setGroupMethod={setGroupMethod} />
    {companies && groupMethod.type === "company" && <CompanyList groupMethod={groupMethod} companies={companies} province={activeProvince} activeCompany={activeCompany} setActiveCompany={setActiveCompany} userGames={userGames} setUserGames={setUserGames} />}
    {companies && groupMethod.type === "game" && <GameList groupMethod={groupMethod} games={GetCompanyRooms(companies)} province={activeProvince} activeCompany={activeCompany} setActiveCompany={setActiveCompany} userGames={userGames} setUserGames={setUserGames} />}
  </div>;
}
export default Panel;