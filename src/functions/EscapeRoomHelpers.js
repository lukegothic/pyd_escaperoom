export const addEscapeRoom = (escapeRooms, escapeRoom) => escapeRooms.filter(e => e.id !== escapeRoom.id).concat(escapeRoom);
