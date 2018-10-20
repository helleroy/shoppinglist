import firebase from "firebase/app";
import "firebase/auth";

export class AuthenticationService {
  _authApp;

  constructor(firebaseApp) {
    this._authApp = firebase.auth(firebaseApp);
    this._authApp.useDeviceLanguage();
  }

  async signInWithGoogle() {
    await this._authApp.signInWithRedirect(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  handleAuthStateChanged(callback) {
    this._authApp.onAuthStateChanged(callback);
  }

  async signOut() {
    try {
      await this._authApp.signOut();
    } catch (error) {
      throw error;
    }
  }
}
