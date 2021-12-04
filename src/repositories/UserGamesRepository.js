// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyBto7Q3-GLqOhIJJIw1iWW-ON2EMJma66k",
    authDomain: "pyd-escaperooms.firebaseapp.com",
    projectId: "pyd-escaperooms",
    storageBucket: "pyd-escaperooms.appspot.com",
    messagingSenderId: "208111287383",
    appId: "1:208111287383:web:f871e38f8973995b0c7712",
    measurementId: "G-M9E6GGXFN7",
    databaseURL: "https://pyd-escaperooms-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Connected to Firebase DDBB", app.name);

export const getRooms = async () => {
    const db = getDatabase();
    const userGames = ref(db, 'games');
    const data = await get(userGames);
    return data.val();
};

export const updateRoom = async (gameID, gameStatus) => {
    const db = getDatabase();
    set(ref(db, 'games/' + gameID), {
        status: gameStatus,
        // TODO: llevar cuenta de escapes terminados / no terminados
        finished: true
    });
};
