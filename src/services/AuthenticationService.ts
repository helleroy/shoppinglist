import firebase from "firebase";
import { AuthenticationAdapter } from "../adapters/AuthenticationAdapter";
import { SignedInUser } from "../types";

export class AuthenticationService {
  _authenticationAdapter: AuthenticationAdapter;
  _authStateChangedUnsubscribe: firebase.Unsubscribe | undefined;

  constructor(authenticationAdapter: AuthenticationAdapter) {
    this._authenticationAdapter = authenticationAdapter;
  }

  async signInWithGoogle(): Promise<void> {
    await this._authenticationAdapter.signInWithGoogle();
  }

  handleAuthStateChanged(callback: (user: SignedInUser | null) => any): void {
    this.unsubscribeAuthStateChangedListener();

    this._authStateChangedUnsubscribe = this._authenticationAdapter.authStateChangedListener(
      callback
    );
  }

  async signOut(): Promise<void> {
    try {
      await this._authenticationAdapter.signOut();
    } catch (error) {
      throw error;
    }
  }

  unsubscribeAuthStateChangedListener(): void {
    if (this._authStateChangedUnsubscribe) {
      this._authStateChangedUnsubscribe();
      this._authStateChangedUnsubscribe = undefined;
    }
  }
}
