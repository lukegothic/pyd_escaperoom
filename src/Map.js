import React, { useEffect, useRef, useState } from "react";
import L, { map } from "leaflet";
import limites_provincias from './ES_limites_provincias';
import { CompanyGamesTooltip, CompanyXProvince, FindCompany, GameCount } from "./functions/CompanyHelpers";
import pin_green from './assets/icons/pin_green.png';
import pin_grey from './assets/icons/pin_grey.png';
import pin_yellow from './assets/icons/pin_yellow.png';
import pin_pink from './assets/icons/pin_pink.png';

const style = {
  flex: 1
};

const base_icon = {
  iconSize: [18, 24],
  iconAnchor: [0, 24],
  popupAnchor: [0, 0]
};

const icons = {
  some_played: L.icon({
    ...base_icon,
    iconUrl: pin_yellow
  }),
  none_played: L.icon({
    ...base_icon,
    iconUrl: pin_grey
  }),
  all_played: L.icon({
    ...base_icon,
    iconUrl: pin_green
  }),
  want_to_play: L.icon({
    ...base_icon,
    iconUrl: pin_pink
  })
};

const province_colors = {
  some_played: "#7f7d00",
  none_played: "#3f3f3f",
  all_played: "#007f00",
  want_to_play: "#7f007f"
};

function Map({ markersData, userGames, activeCompany, setActiveCompany, activeProvince, setActiveProvince }) {
  const [mapProvince, setMapProvince] = useState(null);
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

  const focusMap = ({ province, company }) => {
    province = province || company.city.province.id;
    if (province !== mapProvince) {
      setMapProvince(province);
      const provinceGEOJSON = limites_provincias.features.find(p => p.properties.id === province);
      mapRef.current.fitBounds(L.geoJSON(provinceGEOJSON).getBounds());
      markerLayerRef.current.clearLayers();
      if (provinceGEOJSON.properties.companies) {
        provinceGEOJSON.properties.companies.forEach(company => {
          L.marker(L.latLng(company.latitude, company.longitude), 
            {
              title: CompanyGamesTooltip(company), 
              id: company.id, 
              riseOnHover: true,
              icon: icons.none_played
            })
            .on("click", function (e) {
              setActiveCompany(FindCompany(markersData, e.sourceTarget.options.id));
            })
            .addTo(markerLayerRef.current);
        });                    
      }
    }
    if (company) {
      mapRef.current.setView(L.latLng(company.latitude, company.longitude), 10);
    }
  }

  useEffect(() => {
    markerLayerRef.current = L.layerGroup().addTo(mapRef.current);
  }, []);

  useEffect(() => {
    activeProvince && focusMap({ province: activeProvince });
  }, [activeProvince]);

  useEffect(() => {
    activeCompany && focusMap({ company: activeCompany });
  }, [activeCompany]);

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
                color: province_colors.none_played,
                fillColor: province_colors.none_played,
                fillOpacity: 0.2
              } : {
                color: "grey",
                fillColor: "black",
                fillOpacity: 0.5
              };
            }, 
            filter: (f) => {
              // ocultar la provincia que esta focus... no funciona hay que hacerlo con setStyle por ejemplo
              return f && !f.properties.focused;
            }}).on("click", function (e) {
                  // al hacer clic en provincia, mostrar las companies de esa provincia
                  setActiveProvince(e.sourceTarget.feature.properties.id);
                  //focusMap({ province: e.sourceTarget.feature });
                })
                .addTo(mapRef.current)
                .bindTooltip(l => `${l.feature.properties.name}: ${l.feature.properties.companies ? `${GameCount(l.feature.properties.companies)} juegos en ${l.feature.properties.companies.length} salas` : "No hay salas"}`);
      }
    },
    [markersData]
  );

  return <div id="map" style={style} />;
}

export default Map;
