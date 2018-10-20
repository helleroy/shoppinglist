import firebase from "firebase/app";

export class FirebaseApp {
  _app;

  constructor() {
    this._app = firebase.initializeApp({
      apiKey: "AIzaSyC75sci6JhjJtxF5773owNIyIkVKEvw78U",
      authDomain: "handleliste-f03d5.firebaseapp.com",
      databaseURL: "https://handleliste-f03d5.firebaseio.com",
      projectId: "handleliste-f03d5",
      storageBucket: "",
      messagingSenderId: "653122939571"
    });
  }

  get() {
    return this._app;
  }
}
