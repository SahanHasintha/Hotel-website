import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDEN7Q5LEG3EsucTrw7DRO3R2UPFxhd8Bw",
    authDomain: "my-aapications.firebaseapp.com",
    databaseURL: "https://my-aapications.firebaseio.com",
    projectId: "my-aapications",
    storageBucket: "my-aapications.appspot.com",
    messagingSenderId: "772737296496",
    appId: "1:772737296496:web:86875d649526f5e2486cb5",
    measurementId: "G-5YZ2W30T9F"
}

firebase.initializeApp(config);

export default firebase;