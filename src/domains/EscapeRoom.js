import EscapeRoomStatus from "./EscapeRoomStatus";

export default class EscapeRoom {
    constructor(id = null, status = EscapeRoomStatus.NOT_PLAYED, finished = false) {
        this.id = id;
        this.status = status;
        this.finished = finished;
    }
};
