export class AuthenticationService {
  _authenticationAdapter;
  _authStateChangedUnsubscriber;

  constructor(authenticationAdapter) {
    this._authenticationAdapter = authenticationAdapter;
    this._authStateChangedUnsubscriber = null;
  }

  async signInWithGoogle() {
    await this._authenticationAdapter.signInWithGoogle();
  }

  handleAuthStateChanged(callback) {
    this.unsubscribeAuthStateChangedListener();

    this._authStateChangedUnsubscriber = this._authenticationAdapter.authStateChangedListener(
      callback
    );
  }

  async signOut() {
    try {
      await this._authenticationAdapter.signOut();
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
