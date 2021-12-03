import EscapeRoomStatus from "../../domains/EscapeRoomStatus";

export const getGameStatus = (game, userGames) => game.userStatus ? game.userStatus : (game.id in userGames ? userGames[game.id].status : EscapeRoomStatus.NOT_PLAYED);