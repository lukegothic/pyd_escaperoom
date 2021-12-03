import EscapeRoomStatus from "../../domains/EscapeRoomStatus";

export const getGameStatus = (game, userGames) => game.id in userGames ? userGames[game.id].status : EscapeRoomStatus.NOT_PLAYED;