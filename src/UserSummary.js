import React from "react";
import { GameCount } from "./functions/CompanyHelpers";
function UserSummary({ markersData, userGames }) {
    console.log(userGames);
    const availableRooms = GameCount(markersData);
    const finishedRooms = userGames.rooms.filter(r => r.finished);
    return <div style={{backgroundColor:"rgba(0,200,50,0.1)"}}>
        {userGames.rooms.length > 0 && <p>Hemos hecho {userGames.rooms.length} salas ({userGames.rooms.length / availableRooms}%) y salido de {finishedRooms.length} de ellas ({finishedRooms/userGames.rooms.length}%)</p>}
    </div>;
}
export default UserSummary;