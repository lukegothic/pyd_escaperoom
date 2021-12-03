import EscapeRoomStatus, { EscapeRoomStatusIcon } from '../../domains/EscapeRoomStatus';

// helpers
const isPlayedGame = g => g.user && g.user.status === EscapeRoomStatus.PLAYED;
const isWantedGame = g => g.user && g.user.status === EscapeRoomStatus.WANT_TO_PLAY;

// JOIN COMPANY CON PROVINCIA (reverse dato company.city.province.id hacia arriba)
export const CompanyXProvince = (all) => {
    let company_x_province = {};
    all.forEach(company => {
      if (company_x_province[company.city.province.id] === undefined) {
        company_x_province[company.city.province.id] = [];
      }
      company_x_province[company.city.province.id].push(company);
    });
    return company_x_province;
};
// COMPANIAS COMO ROOMS
export const GetCompanyRooms = (companies) => {
  companies.forEach(company => {
    company.games.forEach(game => {
      game.company = company;
    });
  });
  const reduced = companies.reduce((all, company) => all.concat(company.games), []);
  return reduced;
};

// PROVINCE TOOLTIP
export const ProvinceTooltip = (province, userGames) => {
  if (province.companies && province.companies.length > 0) {
    const companies_x_userGames = JoinCompaniesWithUserGames(province.companies, userGames);
    const allgames = GetCompanyRooms(companies_x_userGames);
    const playedGamesCount = allgames.filter(isPlayedGame).length;
    const wantedGamesCount = allgames.filter(isWantedGame).length;
    return `📍 ${province.name} tiene ${allgames.length} juegos en ${province.companies.length} salas<br />${EscapeRoomStatusIcon[EscapeRoomStatus.PLAYED]} ${playedGamesCount} jugados ${EscapeRoomStatusIcon[EscapeRoomStatus.WANT_TO_PLAY]} ${wantedGamesCount} queremos ir`;
  } else {
    return `No hay salas en ${province.name} 😭`;
  }
};

// CRUZA COMPANIES CON USER GAMES
export const JoinCompaniesWithUserGames = (companies, userGames) => {
  const singleCompany = !Array.isArray(companies);
  singleCompany && (companies = [companies]);
  const allgames = GetCompanyRooms(companies);
  userGames && Object.keys(userGames).forEach(gameId => {
    const g = allgames.find(g => g.id === gameId);
    g && (g.user = userGames[gameId]);
  });
  return singleCompany ? companies[0] : companies;
};
// ENCONTRAR COMPANY POR ID
export const FindCompany = (all, id) => all.find(c => c.id === id);
// TOOLTIP + ICON PAL MAPA
export const CompanyTooltipAndIcon = (company, userGames) => {
  const company_x_userGames = JoinCompaniesWithUserGames(company, userGames);
  const playedGamesCount = company_x_userGames.games.filter(isPlayedGame).length;
  const hasWantToPlay = company_x_userGames.games.some(isWantedGame);
  const allPlayed = company_x_userGames.games.every(isPlayedGame);
  //const longestNameLength = company_x_userGames.games.reduce((max, g) => Math.max(max, g.name.es.length), 0);
  const roomNumIcon = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
  return [
    `🧩 ${`${company_x_userGames.name}`.toUpperCase()} ${"🏴".repeat(playedGamesCount)}${"🏳️".repeat(company_x_userGames.games.length - playedGamesCount)}\n${company_x_userGames.games.map((g, i) => `${roomNumIcon[i]} ${g.user ? EscapeRoomStatusIcon[g.user.status] : EscapeRoomStatusIcon[EscapeRoomStatus.NOT_PLAYED]} ${g.name.es}`).join("\n")}`,
    allPlayed ? "all_played" : (hasWantToPlay ? "want_to_play" : (playedGamesCount > 0 ? "some_played" : "none_played"))
  ];
};

// NUMERO DE ROOMS EN ARRAY DE COMPANIES
export const GameCount = (companies) => {
    Array.isArray(companies) || (companies = [companies]);
    return companies.reduce((sum, item) => sum + item.games.length, 0);
};
// NUMERO DE ROOMS JUGADOS EN ARRAY DE COMPANIES
export const GamePlayedCount = (companies, userGames) => {
  Array.isArray(companies) || (companies = [companies]);
  const companies_x_userGames = JoinCompaniesWithUserGames(companies, userGames);
  const allgames = GetCompanyRooms(companies_x_userGames);
  return allgames.reduce((sum, item) => sum + (item.user && item.user.status === EscapeRoomStatus.PLAYED ? 1 : 0), 0);
};
// HAY ALGUNA COMPANY CON SALA WANT TO PLAY?
export const HasWantToPlay = (companies, userGames) => {
    Array.isArray(companies) || (companies = [companies]);
    const companies_x_userGames = JoinCompaniesWithUserGames(companies, userGames);
    const allgames = GetCompanyRooms(companies_x_userGames);
    return allgames.some(isWantedGame);
};
