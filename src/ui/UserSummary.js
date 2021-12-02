import React from "react";
import EscapeRoomStatus, { EscapeRoomStatusIcon } from "../domains/EscapeRoomStatus";
import { GameCount } from "./functions/CompanyHelpers";
import { WantToPlayRooms, DoneRooms } from "./functions/UserGamesHelpers";
 
function UserSummary({ companies, userGames }) {
    const availableRooms = GameCount(companies);
    const doneRooms = DoneRooms(userGames);
    const wantToPlayRooms = WantToPlayRooms(userGames);
    //const finishedRooms = FinishedEscapeRoom(userGames);
    //{userGames && doneRooms.length > 0 && <p>Hemos hecho  juegos  y salido de {finishedRooms.length} de ellas ({Math.round((finishedRooms.length/doneRooms.length)*100)}%).</p>}
    return <div style={{ position:"absolute", zIndex: 1000, right: "32%", top: "5px", width: "15%" }}>
        <div style={{ position:"relative" }}>
            <progress style={{width:"100%", height:"17px", backgroundColor:"#fff", border: "1px solid #fff", boxShadow: "0 0 0 1px #000"}} value={doneRooms.length} max={availableRooms}></progress>
            <span className="progress-label font-small">{doneRooms.length} / {availableRooms} ({Math.round((doneRooms.length / availableRooms)*100)}%)</span>
        </div>
        <div style={{ position:"relative", width: "100%", textAlign: "right" }}>
            <span className="wanttoplay-heart">{EscapeRoomStatusIcon[EscapeRoomStatus.WANT_TO_PLAY]}</span>
            <span className="wanttoplay-label">{wantToPlayRooms.length}</span>
        </div>
    </div>;
}
export default UserSummary;