import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/messaging";

export class FirebaseApp {
  _app;
  _db;
  _auth;
  _messaging;

  constructor() {
    this._app = firebase.initializeApp({
      apiKey: "AIzaSyC75sci6JhjJtxF5773owNIyIkVKEvw78U",
      authDomain: "handleliste-f03d5.firebaseapp.com",
      databaseURL: "https://handleliste-f03d5.firebaseio.com",
      projectId: "handleliste-f03d5",
      storageBucket: "handleliste-f03d5.appspot.com",
      messagingSenderId: "653122939571",
      appId: "1:653122939571:web:b2d611dd62cf7a00299ec6"
    });

    this._db = firebase.firestore(this._app);

    this._auth = firebase.auth(this._app);
    this._auth.useDeviceLanguage();

    if (firebase.messaging.isSupported()) {
      this._messaging = firebase.messaging();
      this._messaging.usePublicVapidKey(
        "BIlIsfvbhieh8dLuLLmgnEd852fZc-0x7A8hffbsAz_1zB92yxKVj4uyp-ZyB2FZ3hY98h4eQilwZ9u4SernMNo"
      );
    }
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

  get messaging() {
    return this._messaging;
  }
}
