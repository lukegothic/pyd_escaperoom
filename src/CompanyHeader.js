import React from "react";
function CompanyHeader({ company, setActiveCompany }) {
    return <div style={{/*display:"flex", flexWrap:"nowrap"*/}} onClick={() => setActiveCompany && setActiveCompany(company)}>
        <div>{company.name}</div>
        {company.opinion_count > 0 && <div> {company.rating} de {company.opinion_count} reseñas</div>}
        <div>{company.games.length} juegos</div>
        <div><i className="fas fa-map-marker-alt"></i> {company.city.name.es}</div>
        <div>{company.web_page && <a href={company.web_page} title="Página Web"><i className="fas fa-globe"></i></a>}{company.trip_advisor && <a href={company.trip_advisor} title="Reseñas en Trip Advisor"><i className="fas fa-binoculars"></i></a>}</div>
    </div>;
}

export default CompanyHeader;