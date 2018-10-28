export class FirebaseApp {
  _app;
  _db;
  _auth;
  _messaging;

  constructor() {
    this._app = { options: {} };
    this._db = {};
    this._auth = { onAuthStateChanged: () => {} };
    this._messaging = {};
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
