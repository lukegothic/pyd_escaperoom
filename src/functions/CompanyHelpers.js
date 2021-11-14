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
export const FindCompany = (all, id) => all.find(c => c.id === id);
export const CompanyGamesTooltip = (company) => `- ${company.name} -\n${company.games.map(g => g.name.es).join("\n")}`;
export const GameCount = (companies) => {
    Array.isArray(companies) || (companies = [companies]);
    return companies.reduce((sum, item) => sum + item.games.length, 0);
};
