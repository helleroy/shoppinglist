import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/messaging";

interface Options {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export class FirebaseApp {
  _options: Options;
  _app: firebase.app.App;
  _db: firebase.firestore.Firestore;
  _auth: firebase.auth.Auth;
  _messaging: firebase.messaging.Messaging | null = null;

  constructor(options: Options) {
    this._options = options;

    this._app = firebase.initializeApp(options);

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

  get options() {
    return this._options;
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
