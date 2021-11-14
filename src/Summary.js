import React from "react";
import { GameCount } from "./functions/CompanyHelpers";
function Summary({ markersData, userPreferences }) {
    const availableRooms = GameCount(markersData);
    const finishedRooms = userPreferences.rooms.filter(r => r.finished);
    return <div>
        <p>Hay un total de {availableRooms} salas en España creadas por {markersData.length} empresas</p>
        {userPreferences.rooms.length > 0 && <p>Hemos hecho {userPreferences.rooms.length} salas ({userPreferences.rooms.length / availableRooms}%) y salido de {finishedRooms.length} de ellas ({finishedRooms/userPreferences.rooms.length}%)</p>}
    </div>;
}
export default Summary;