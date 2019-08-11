import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.app = app;
        this.db = app.database();
    }
    auth(providerName) {
        let provider = new this.app.auth.GoogleAuthProvider();
        switch (providerName.toLowerCase()) {
            case "facebook":
                provider = new this.app.auth.FacebookAuthProvider();
                break;
        }
        return this.app.auth().signInWithPopup(provider).then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;
            console.log(user);
            return user;
        }).catch(function (error) {
            console.log("error", error);
        });
    }
}

export default Firebase;