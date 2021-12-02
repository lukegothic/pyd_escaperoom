import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { CompanyTooltipAndIcon, CompanyXProvince, GameCount, GamePlayedCount, HasWantToPlay, ProvinceTooltip } from "./functions/CompanyHelpers";
import pin_green from '../assets/icons/pin_green.png';
import pin_grey from '../assets/icons/pin_grey.png';
import pin_yellow from '../assets/icons/pin_yellow.png';
import pin_pink from '../assets/icons/pin_pink.png';
import limites_provincias from '../data/ES_limites_provincias';

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
  none_played: "#6f6f6f",
  all_played: "#007f00",
  want_to_play: "#7f007f"
};



function Map({ mapData, userGames, activeCompany, setActiveCompany, activeProvince, setActiveProvince }) {
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

  const provinceLayerStyle = (f) => {
    const style = {
      color: "grey",
      fillColor: "black",
      fillOpacity: 0.5
    };
    if (f && f.properties.companies) {
      style.fillOpacity = 0.1;
      const prov_game_count = GameCount(f.properties.companies);
      const prov_game_count_user = GamePlayedCount(f.properties.companies, userGames);
      const hasWantToPlay = HasWantToPlay(f.properties.companies, userGames);
      if (prov_game_count === prov_game_count_user) {
        style.color = province_colors.all_played;
        style.fillColor = province_colors.all_played;
      } else {
        if (hasWantToPlay) {
          style.color = province_colors.want_to_play;
          style.fillColor = province_colors.want_to_play;
        } else if (prov_game_count_user > 0) {
          style.color = province_colors.some_played;
          style.fillColor = province_colors.some_played;
        } else {
          style.color = province_colors.none_played;
          style.fillColor = province_colors.none_played;
        }
      }
    }
    return style;
  };

  const generateMarkers = ({ province, userGames }) => {
    province = province || findProvince(activeProvince);
    userGames = userGames || mapData.userGames;
    markerLayerRef.current.clearLayers();
    if (province && province.properties.companies) {
      province.properties.companies.forEach(company => {
        const [tooltip, icon] = CompanyTooltipAndIcon(company, userGames);
        L.marker(L.latLng(company.latitude, company.longitude), {
          title: tooltip,
          id: company.id,
          riseOnHover: true,
          icon: icons[icon]
        })
          .on("click", function (e) {
            setActiveCompany(company);
            window.location.hash = company.id;
          })
          .addTo(markerLayerRef.current);
      });
    }
  };
  const findProvince = (province) => {
    return limites_provincias.features.find(p => p.properties.id === province);
  };

  const focusMap = ({ province, company }) => {
    province = province || company.city.province.id;
    if (province !== mapProvince) {
      setMapProvince(province);
      const myProvince = findProvince(province);
      mapRef.current.fitBounds(L.geoJSON(myProvince).getBounds());
      generateMarkers({ province: myProvince });
    }
    if (company) {
      mapRef.current.setView(L.latLng(company.latitude, company.longitude), Math.max(mapRef.current.getZoom(), 14));
    }
  }

  useEffect(() => {
    markerLayerRef.current = L.layerGroup().addTo(mapRef.current);
  }, []);

  useEffect(() => {
    activeProvince && focusMap({ province: activeProvince });
  }, [activeProvince]);

  useEffect(() => {
    if (activeCompany) {
      setActiveProvince(activeCompany.city.province.id);
      focusMap({ company: activeCompany });
    }
  }, [activeCompany]);

  // update markers
  useEffect(
    () => {
      // cruzar companias por provincia
      if (!mapData) return;
      const company_x_province = CompanyXProvince(mapData.companies);
      // asignar companias a cada provincia
      const not_mapped_provinces = [];
      Object.keys(company_x_province).forEach(prov => {
        const provfeat = limites_provincias.features.find(p => p.properties.id === prov || (p.properties.child_ids && p.properties.child_ids.indexOf(prov) !== -1));
        if (provfeat) {
          provfeat.properties.companies = company_x_province[prov];
        } else {
          not_mapped_provinces.push(prov);
        }
      });
      // reportar
      if (not_mapped_provinces.length > 0) {
        console.warn(`Provinces not mapped: ${not_mapped_provinces.join(', ')}`);
      }
      // generar capa limites
      limitLayerRef.current =
        L.geoJSON(limites_provincias, {
          style: provinceLayerStyle,
          filter: (f) => {
            // TODO: ocultar la provincia que esta focus... no funciona hay que hacerlo con setStyle por ejemplo
            return f && !f.properties.focused;
          }
        }).on("click", function (e) {
          setActiveProvince(e.sourceTarget.feature.properties.id);
        }).addTo(mapRef.current)
          .bindTooltip(l => ProvinceTooltip(l.feature.properties, mapData.userGames));
    },
    [mapData]
  );

  useEffect(
    () => {
      if (mapData) {
        // REGENEARAR ESTILO PROVINCIA
        limitLayerRef.current.setStyle(provinceLayerStyle);
        // REGENERAR ESTILO MARKERS
        generateMarkers({ userGames });
      }
    }, 
    [userGames]
  );

  return <div id="map" style={style} />;
}

export default Map;
