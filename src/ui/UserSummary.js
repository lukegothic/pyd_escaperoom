import React from "react";
import { GameCount } from "./functions/CompanyHelpers";
import { FinishedEscapeRoom, WantToPlayRooms, DoneRooms } from "./functions/UserGamesHelpers";

function UserSummary({ companies, userGames }) {
    const availableRooms = GameCount(companies);
    const doneRooms = DoneRooms(userGames);
    const wantToPlayRooms = WantToPlayRooms(userGames);
    const finishedRooms = FinishedEscapeRoom(userGames);
    return <div style={{backgroundColor:"rgba(0,200,50,0.1)"}}>
        <progress style={{width:"100%", height:"10px", backgroundColor:"rgba(0,200,50,0.1)"}} value={doneRooms.length} max={availableRooms}></progress>
        {userGames && doneRooms.length > 0 && <p>Hemos hecho {doneRooms.length} juegos ({Math.round((doneRooms.length / availableRooms)*100)}%) y salido de {finishedRooms.length} de ellas ({Math.round((finishedRooms.length/doneRooms.length)*100)}%).</p>}
        {userGames && <p>Tenemos pendientes {wantToPlayRooms.length} juegos.</p>}
    </div>;
}
export default UserSummary;