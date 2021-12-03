import React from "react";
import EscapeRoomStatus, { EscapeRoomStatusIcon } from "../domains/EscapeRoomStatus";
import { GameCount } from "./functions/CompanyHelpers";
import { WantToPlayRooms, DoneRooms } from "./functions/UserGamesHelpers";
 
function UserSummary({ companies, userGames }) {
    const availableRooms = GameCount(companies);
    const doneRooms = DoneRooms(userGames);
    const wantToPlayRooms = WantToPlayRooms(userGames);
    return <div>
        <div style={{ position:"relative", width: "250px" }}>
            <progress className="progress-bar" value={doneRooms.length} max={availableRooms}></progress>
            <span className="progress-label">{doneRooms.length} / {availableRooms} ({Math.round((doneRooms.length / availableRooms)*100)}%)</span>
        </div>
        <div style={{ position:"relative" }}>
            <span className="wanttoplay-heart">{EscapeRoomStatusIcon[EscapeRoomStatus.WANT_TO_PLAY]}</span>
            <span className="wanttoplay-label">{wantToPlayRooms.length}</span>
        </div>
    </div>;
}
export default UserSummary;