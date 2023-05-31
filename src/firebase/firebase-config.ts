import { firebaseConfig } from "../types/firebase-config";
const config: firebaseConfig = {

    apiKey: "AIzaSyA_PqNUJR201HCHKxOxJkU29SJqV3s767E",

    authDomain: "fbase-chat-959da.firebaseapp.com",

    databaseURL: "https://fbase-chat-959da-default-rtdb.europe-west1.firebasedatabase.app",

    projectId: "fbase-chat-959da",

    storageBucket: "fbase-chat-959da.appspot.com",

    messagingSenderId: "62640434548",

    appId: "1:62640434548:web:077103c225cf14cf51d021",

    measurementId: "G-EWF4EK6H4Z"
};

export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
        throw new Error('No firebase config setup')
    }
    else return config
}

