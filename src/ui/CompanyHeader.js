import React from "react";
function CompanyHeader({ company, setActiveCompany }) {
    return <div className="company-header" title="clic para ver juegos" onClick={() =>setActiveCompany && setActiveCompany(company)}>
            <div className="company-name"><a title="clic para ver su página web" name={company.id} href={company.web_page} target="_blank" rel="noopener noreferrer">{company.name}</a></div>
            <div>{company.opinion_count > 0 ? <span><span title={`${company.rating} de 5 estrellas`} className="stars" style={{"--rating": company.rating}}></span><span className="font-small valign-top">(<a href={company.trip_advisor} title="clic para ver valoraciones en trip advisor" target="_blank" rel="noopener noreferrer">{company.opinion_count}</a>)</span></span> : <span>Sin reseñas</span>}</div>
            <div className="font-small">{company.games.length} juegos</div>
            <div className="font-small"><i className="fas fa-map-marker-alt"></i> {company.city.name.es}</div>
        </div>
}

export default CompanyHeader;