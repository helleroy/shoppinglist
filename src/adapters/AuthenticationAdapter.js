import firebase from "firebase/app";

export class AuthenticationAdapter {
  _auth;

  constructor(auth) {
    this._auth = auth;
  }

  async signInWithGoogle() {
    try {
      await this._auth.signInWithRedirect(
        new firebase.auth.GoogleAuthProvider()
      );
    } catch (error) {
      console.log(error);
    }
  }

  authStateChangedListener(callback) {
    try {
      return this._auth.onAuthStateChanged(callback);
    } catch (error) {
      console.log(error);
    }
  }

  async signOut() {
    try {
      await this._auth.signOut();
    } catch (error) {
      console.log(error);
    }
  }
}
