export default class UserPreferences {
    constructor({ provincia = null, group = 0 }) {
        this.provincia = provincia;
        this.group = group;
    }
}
