import React from "react";
function CompanyHeader({ company, setActiveCompany }) {
    return <div style={{/*display:"flex", flexWrap:"nowrap"*/}} onClick={() => setActiveCompany && setActiveCompany(company)}>
        <div><a href={company.web_page} target="_blank" rel="noopener noreferrer">{company.name}</a>{company.games.length} juegos</div>
        <div>{company.opinion_count > 0 ? <span><span className="stars" style={{"--rating": company.rating}}></span> (<a href={company.trip_advisor} target="_blank" rel="noopener noreferrer">{company.opinion_count}</a>)</span> : <span>Sin reseñas</span>}<i className="fas fa-map-marker-alt"></i> {company.city.name.es}</div>
    </div>;
}

export default CompanyHeader;