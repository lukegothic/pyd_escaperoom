import UserPreferences from "../domains/UserPreferences";
import StorageService from "../services/StorageService";

const UserPreferencesRepository = {
    get: () => {
        return new UserPreferences(StorageService.get("UserPreferences") || {});
    },
    set: (value) => {
        return StorageService.set("UserPreferences", value);
    },
}
export default UserPreferencesRepository;