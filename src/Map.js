import React, { useEffect, useRef } from "react";
import L, { map } from "leaflet";
import limites_provincias from './ES_limites_provincias';
import { CompanyGamesTooltip, CompanyXProvince, FindCompany } from "./functions/CompanyHelpers";

const style = {
  flex: 1
};

function Map({ markersData, userPreferences, setActiveCompany, setActiveProvince }) {
  // create map
  const mapRef = useRef(null);
  useEffect(() => {
    mapRef.current = L.map("map", {
      center: [40.1, -2.5737],
      zoom: 6,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    });
  }, []);

  // add layer
  const markerLayerRef = useRef(null);
  const limitLayerRef = useRef(null);

  const baseStyle = {
    color: "grey",
    fillColor: "black",
    fillOpacity: 0.3
  };

  useEffect(() => {
    markerLayerRef.current = L.layerGroup().addTo(mapRef.current);
  }, []);

  // update markers
  useEffect(
    () => {
     if (markersData) {
        // cruzar companias por provincia
        const company_x_province = CompanyXProvince(markersData);
        // asignar companias a cada provincia
        Object.keys(company_x_province).forEach(prov => {
          const provfeat = limites_provincias.features.find(p => p.properties.id === prov || p.properties.child_ids && p.properties.child_ids.indexOf(prov) !== -1);
          if (provfeat) {
            provfeat.properties.companies = company_x_province[prov];
          } else {
            console.log(prov);
          }
        });
        // generar capa limites
        limitLayerRef.current = 
          L.geoJSON(limites_provincias, { 
            style: (f) => {
              return f && f.properties.companies ? {
                color: "green",
                fillColor: "green",
                fillOpacity: 0.1
              } : baseStyle;
            }, 
            filter: (f) => {
              // ocultar la provincia que esta focus... no funciona hay que hacerlo con setStyle por ejemplo
              return f && !f.properties.focused;
            }}).on("click", function (e) {
                  // al hacer clic en provincia, mostrar las companies de esa provincia
                  mapRef.current.fitBounds(e.sourceTarget.getBounds());
                  setActiveProvince(e.sourceTarget.feature.properties.id);
                  markerLayerRef.current.clearLayers();
                  if (e.sourceTarget.feature.properties.companies) {
                    e.sourceTarget.feature.properties.companies.forEach(marker => {
                      L.marker(L.latLng(marker.latitude, marker.longitude), 
                        { title: CompanyGamesTooltip(marker), id: marker.id, riseOnHover: true })
                        .on("click", function (e) {
                          setActiveCompany(FindCompany(markersData, e.sourceTarget.options.id));
                        })
                        .addTo(markerLayerRef.current);
                    });                    
                  }                  
                })
                .addTo(mapRef.current)
                .bindTooltip(l => `${l.feature.properties.name}\n${l.feature.properties.companies ? l.feature.properties.companies.length : "No hay "} salas`);
      }
    },
    [markersData]
  );

  return <div id="map" style={style} />;
}

export default Map;
