import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth";
import {
  getMessaging,
  isSupported as isMessagingSupported,
  Messaging,
} from "firebase/messaging";

interface Options {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export class Firebase {
  _options: Options;
  _app: FirebaseApp;
  _db: Firestore;
  _auth: Auth;
  _messaging: Messaging | null = null;

  constructor(options: Options) {
    this._options = options;

    this._app = initializeApp(options);

    this._db = getFirestore(this._app);

    this._auth = getAuth(this._app);
    this._auth.useDeviceLanguage();

    isMessagingSupported().then((messagingSupported) => {
      if (messagingSupported) {
        this._messaging = getMessaging(this._app);
      }
    });
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
