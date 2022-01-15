export class Firebase {
  _options: {};
  _app: {};
  _db: {};
  _auth: {};
  _messaging: {};

  constructor() {
    this._options = {};
    this._app = {};
    this._db = {};
    this._auth = {
      onAuthStateChanged: () => {},
    };
    this._messaging = {};
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
