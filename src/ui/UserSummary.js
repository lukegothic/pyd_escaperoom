import React from "react";
import { GameCount } from "./functions/CompanyHelpers";
import { FinishedEscapeRoom, WantToPlayRooms, DoneRooms } from "./functions/UserGamesHelpers";

function UserSummary({ companies, userGames }) {
    const availableRooms = GameCount(companies);
    const doneRooms = DoneRooms(userGames);
    const wantToPlayRooms = WantToPlayRooms(userGames);
    //const finishedRooms = FinishedEscapeRoom(userGames);
    //{userGames && doneRooms.length > 0 && <p>Hemos hecho  juegos  y salido de {finishedRooms.length} de ellas ({Math.round((finishedRooms.length/doneRooms.length)*100)}%).</p>}
    return <div style={{ position:"absolute", zIndex: 1000, right: "31%", top: "5px", width: "15%" }}>
        <div style={{ position:"relative" }}>
            <progress style={{width:"100%", height:"17px", backgroundColor:"rgba(0,200,50,1)", border: "1px solid #fff", boxShadow: "0 0 1px #000"}} value={doneRooms.length} max={availableRooms}></progress>
            <span style={{ position: "absolute", width:"100%", top: 0, left: 0, textAlign: "center" }}>{doneRooms.length} / {availableRooms} ({Math.round((doneRooms.length / availableRooms)*100)}%)</span>
        </div>
        <div style={{ width: "100%", textAlign: "right"}}>💖 {wantToPlayRooms.length}</div>
    </div>;
}
export default UserSummary;