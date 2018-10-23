import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export class FirebaseApp {
  _app;
  _db;
  _auth;

  constructor() {
    this._app = firebase.initializeApp({
      apiKey: "AIzaSyC75sci6JhjJtxF5773owNIyIkVKEvw78U",
      authDomain: "handleliste-f03d5.firebaseapp.com",
      databaseURL: "https://handleliste-f03d5.firebaseio.com",
      projectId: "handleliste-f03d5",
      storageBucket: "",
      messagingSenderId: "653122939571"
    });

    this._db = firebase.firestore(this._app);
    this._db.settings({
      timestampsInSnapshots: true
    });

    this._auth = firebase.auth(this._app);
    this._auth.useDeviceLanguage();
  }

  get app() {
    return this._app;
  }

  get db() {
    return this._db;
  }

  get auth() {
    return this._auth;
  }
}
