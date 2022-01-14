import {
  Auth,
  signInWithRedirect,
  GoogleAuthProvider,
  User,
  Unsubscribe,
} from "firebase/auth";

export class AuthenticationAdapter {
  _auth: Auth;

  constructor(auth: Auth) {
    this._auth = auth;
  }

  async signInWithGoogle(): Promise<void> {
    try {
      await signInWithRedirect(this._auth, new GoogleAuthProvider());
    } catch (error) {
      console.log(error);
    }
  }

  authStateChangedListener(
    callback: (user: User | null) => any
  ): Unsubscribe | undefined {
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
