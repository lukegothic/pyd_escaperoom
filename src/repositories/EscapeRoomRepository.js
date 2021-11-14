import ERLDecrypter from "../functions/ERLDecrypter";

const EscapeRoomRepository = {
    endpoint: "https://www.escaperoomlover.com/api/es/public/company/all",
    proxy: "https://desolate-coast-21805.herokuapp.com/",
    cacheOptions: { cache: "force-cache" },
    get: async () => {
        const response = await fetch(`${this.proxy}/${this.endpoint}`, this.cacheOptions);
        const json = await response.json();
        return JSON.parse(ERLDecrypter.decrypt(json));
    }
}
export default EscapeRoomRepository;
