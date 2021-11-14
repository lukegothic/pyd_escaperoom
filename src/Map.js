import React, { useEffect, useRef } from "react";
import L, { map } from "leaflet";
import limites_provincias from './ES_limites_provincias';

const style = {
  flex: 1
};

function Map({ markersData }) {
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

  const computedStyle = 

  useEffect(() => {
    markerLayerRef.current = L.layerGroup().addTo(mapRef.current);
  }, []);

  // update markers
  useEffect(
    () => {
      /*
      markerLayerRef.current.clearLayers();
      markersData.forEach(marker => {
        L.marker(marker.latLng, { title: marker.title }).addTo(
          markerLayerRef.current
        );
      });
      */
     if (markersData) {
        let marker_x_prov = {};
        markersData.forEach(marker => {
          if (marker_x_prov[marker.city.province.id] === undefined) {
            marker_x_prov[marker.city.province.id] = [];
          }
          marker_x_prov[marker.city.province.id].push(marker);
        });

        Object.keys(marker_x_prov).forEach(prov => {
          const provfeat = limites_provincias.features.find(p => p.properties.id === prov || p.properties.child_ids && p.properties.child_ids.indexOf(prov) !== -1);
          if (provfeat) {
            provfeat.properties.companies = marker_x_prov[prov];
          } else {
            console.log(prov);
          }
        });
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
              return f && !f.properties.focused;
            }}).on("click", function (e) {
                  mapRef.current.fitBounds(e.sourceTarget.getBounds());
                  markerLayerRef.current.clearLayers();
                  if (e.sourceTarget.feature.properties.companies) {
                    e.sourceTarget.feature.properties.companies.forEach(marker => {
                      L.marker(L.latLng(marker.latitude, marker.longitude), { title: marker.title, id: marker.id }).addTo(
                        markerLayerRef.current
                      );
                    });                    
                  }                  
                })
                .addTo(mapRef.current)
                .bindTooltip(function (layer) {
                  return `${layer.feature.properties.name}\n${layer.feature.properties.companies ? layer.feature.properties.companies.length : "No hay "} escapes`;
                });
      }
    },
    [markersData]
  );

  return <div id="map" style={style} />;
}

export default Map;
