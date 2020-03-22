import firebase from "firebase/app";

export class AuthenticationAdapter {
  _auth: firebase.auth.Auth;

  constructor(auth: firebase.auth.Auth) {
    this._auth = auth;
  }

  async signInWithGoogle(): Promise<void> {
    try {
      await this._auth.signInWithRedirect(
        new firebase.auth.GoogleAuthProvider()
      );
    } catch (error) {
      console.log(error);
    }
  }

  authStateChangedListener(
    callback: (user: firebase.User | null) => any
  ): firebase.Unsubscribe | undefined {
    try {
      return this._auth.onAuthStateChanged(callback);
    } catch (error) {
      console.log(error);
    }
  }

  async signOut(): Promise<void> {
    try {
      await this._auth.signOut();
    } catch (error) {
      console.log(error);
    }
  }
}
