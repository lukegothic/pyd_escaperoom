import ERLDecrypter from "../functions/ERLDecrypter";

const EscapeRoomRepository = {
    get: async () => {
        const endpoint = "https://www.escaperoomlover.com/api/es/public/company/all";
        const proxy = "https://desolate-coast-21805.herokuapp.com";
        const cacheOptions = { cache: "force-cache" };
        const response = await fetch(`${proxy}/${endpoint}`, cacheOptions);
        const json = await response.json();
        return JSON.parse(ERLDecrypter.decrypt(json));
    }
}
export default EscapeRoomRepository;
