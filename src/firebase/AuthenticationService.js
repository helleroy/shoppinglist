import firebase from "firebase/app";
import "firebase/auth";

export class AuthenticationService {
  _authApp;
  _authStateChangedUnsubscriber;

  constructor(firebaseApp) {
    this._authApp = firebase.auth(firebaseApp);
    this._authApp.useDeviceLanguage();
    this._authStateChangedUnsubscriber = null;
  }

  async signInWithGoogle() {
    await this._authApp.signInWithRedirect(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  handleAuthStateChanged(callback) {
    this.unsubscribeAuthStateChangedListener();

    this._authStateChangedUnsubscriber = this._authApp.onAuthStateChanged(
      callback
    );
  }

  async signOut() {
    try {
      await this._authApp.signOut();
    } catch (error) {
      throw error;
    }
  }

  unsubscribeAuthStateChangedListener() {
    if (this._authStateChangedUnsubscriber) {
      this._authStateChangedUnsubscriber();
      this._authStateChangedUnsubscriber = null;
    }
  }
}
