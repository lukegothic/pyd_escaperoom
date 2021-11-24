import EscapeRoomStatus from "../domains/EscapeRoomStatus";

export const RoomsArray = (userRooms) => Object.keys(userRooms).map(id => ({ id, ...userRooms[id] }));
export const DoneRooms = (userRooms) => RoomsArray(userRooms).filter(room => room.status === EscapeRoomStatus.PLAYED);
export const FinishedEscapeRoom = (userRooms) => RoomsArray(userRooms).filter(room => room.status === EscapeRoomStatus.PLAYED && room.finished);
export const WantToPlayRooms = (userRooms) => RoomsArray(userRooms).filter(room => room.status === EscapeRoomStatus.WANT_TO_PLAY);
