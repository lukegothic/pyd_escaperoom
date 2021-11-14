import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Map from "./Map";
import { AES, enc, lib } from 'crypto-js';
import Panel from "./Panel";
import Wrapper from "./Wrapper";
import UserPreferencesRepository from "./repositories/UserPreferencesRepository";
import EscapeRoom from "./domains/EscapeRoom";
import EscapeRoomStatus from "./domains/EscapeRoomStatus";
import { addEscapeRoom } from "./functions/EscapeRoomHelpers";
import EscapeRoomRepository from "./repositories/EscapeRoomRepository";

// TODO:
// PARTE 1: MAPA
// 1.1 mapa españa
// 1.2 provincias (vision pajaro) + simbología
// 1.3 labels
// 1.3.1 numero de escape rooms
// 1.3.2 numero hechos
// 1.4 clic en pronvicia
// 1.4.1 centrar en provincia
// 1.4.2 load marcadores escape
// 1.4.3 pronvicia invisible
// 1.5 marcadores
// 1.5.1 mostrar marcadores pronvicia + simbología de los hechos
// 1.5.2 clic en marcador => centrar + load info en panel (parte de arriba)

// PARTE 2 panel info
// 2.1 control filtrador salas (afeta a lista salas)
// 2.1.1 nombre
// 2.1.2 jugadores
// 2.1.3 tematica
// 2.2 lista empresas con sus salas
// 2.2.1 empresas acordeon (agrupar... salvo que no mole salvo por los marcadores en mapa)
// 2.2.2 salas
// 2.3 datos sala
// 2.3.1 estado (hecha, want to go, don't, ns/nc)
// 2.3.1.1 cambiar estado
// 2.3.2 metadatos sala o empresa: nombre- web- tripadvisor - puntuacion - tematica - precio - jugadores
// 2.4 clic en sala => centrar en mapa (oculta provincia, load marcadores, centra en marcador sala)

// PARTE 3 modo movil
// 3.1 diseño (copy google)
// 3.2 integrar

function App() {
  const [markersData, setMarkersData] = useState(null);
  const [activeProvince, setActiveProvince] = useState(null);
  const [activeCompany, setActiveCompany] = useState(null);

  useEffect(() => {
    /*
    const companies = await EscapeRoomRepository.get();
    const userPreferences = await UserPreferencesRepository.get();
    setMarkersData(companies);
    */
/*
    const k = UserPreferencesRepository.get();
    console.log(k);
    const newescapes = addEscapeRoom(k.escapeRooms, new EscapeRoom("chuca", EscapeRoomStatus.PLAYED, true));
    const b = UserPreferencesRepository.set({...k, escapeRooms: newescapes});
    console.log(b);
    */
    // https://www.escaperoomlover.com/api/es/public/city/all
    // https://www.escaperoomlover.com/api/es/public/games/category/all
    // https://www.escaperoomlover.com/api/es/public/games/audience/all
    // https://www.escaperoomlover.com/api/es/public/games/theme/all
    // https://www.escaperoomlover.com/api/es/public/games/difficulty/all
    // EN PRUEBAS: siempre usar cache

    const testing = true;
    const opts = testing ? { cache: "force-cache" } : {};
    fetch("https://desolate-coast-21805.herokuapp.com/https://www.escaperoomlover.com/api/es/public/company/all", opts).then(r => r.json().then(r2 => {
      const d = AES.decrypt(r2, "", { 
        format: {
          stringify: (t) => {
            console.log("sf", t);
          },
          parse: (t) => {
            var e = JSON.parse(t);
            var n = lib.CipherParams.create({
              ciphertext: enc.Base64.parse(e.ct)
            });
            return e.iv && (n.iv = enc.Hex.parse(e.iv)), e.s && (n.salt = enc.Hex.parse(e.s)), n;
          }
        } 
      });
      const s = d.toString(enc.Utf8);
      const companies = JSON.parse(s);
      
      console.log(companies);
      setMarkersData(companies);
      //const markers = companies.map(c => ({ latLng: { lat: c.latitude, lng: c.longitude }, title: c.name, id: c.id }));
      
    }));
  }, []);

  return <Wrapper>
      <Map markersData={markersData} />
      <Panel markersData={markersData} />
  </Wrapper>;
}

render(<App />, document.getElementById("root"));
