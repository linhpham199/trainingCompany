import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAMPQq4u5uMx4BBDWzAzClOiR1uv-n-Hzg",
    authDomain: "ptcompany-001.firebaseapp.com",
    databaseURL: "https://ptcompany-001.firebaseio.com",
    projectId: "ptcompany-001",
    storageBucket: " ",
    // storageBucket: "ptcompany-001.appspot.com",
    messagingSenderId: "861128925666"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
    auth,
};