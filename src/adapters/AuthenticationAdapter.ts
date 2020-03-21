import firebase from "firebase/app";

export class AuthenticationAdapter {
  _auth: firebase.auth.Auth;

  constructor(auth: firebase.auth.Auth) {
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

  authStateChangedListener(callback: (user: firebase.User | null) => any) {
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
