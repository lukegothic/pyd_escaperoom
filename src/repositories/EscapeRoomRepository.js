import ERLDecrypter from '../ui/functions/ERLDecrypter';
import escape_rooms from '../data/escaperoomlover.company.all.json';
const EscapeRoomRepository = {
    get: async () => {
        /*
        const endpoint = "https://www.escaperoomlover.com/api/es/public/company/all";
        const proxy = "https://corsicorsi.herokuapp.com";
        const cacheOptions = { cache: "force-cache" };
        const response = await fetch(`${proxy}/${endpoint}`, cacheOptions);
        const response = await fetch("escaperoomlover.company.all.json");
        const json = await response.json();
        */
        const d = ERLDecrypter.decrypt(escape_rooms);
        console.log(d);
        return JSON.parse(d);
    }
}
export default EscapeRoomRepository;
