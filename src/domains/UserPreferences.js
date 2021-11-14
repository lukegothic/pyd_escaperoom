export default class UserPreferences {
    constructor({test = "test", escapeRooms = []}) {
        this.test = test;
        this.escapeRooms = escapeRooms;
    }
}
