const StorageService = {
    get: (key) => {
        try {
            const value = localStorage.getItem(key);

            return value ? JSON.parse(value) : null;
        } catch (e) {

            return null;
        }
    },
    set: (key, obj) => {
        try {
            const value = JSON.stringify(obj);

            localStorage.setItem(key, value);
            return true;
        } catch (e) {
            return false;
        }
    }
};

export default StorageService;