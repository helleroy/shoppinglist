import React, { Component, Fragment } from "react";
import { authenticationService } from "../context";

class UserStatus extends Component {
  async signIn() {
    await authenticationService.signInWithGoogle();
  }

  async signOut() {
    await authenticationService.signOut();
  }

  render() {
    const { user } = this.props;

    return (
      <div className="d-flex justify-content-end align-items-center">
        {user ? (
          <Fragment>
            <span className="header-item mr-2">{user.displayName}</span>
            <img
              src={user.photoURL}
              alt={`${user.displayName}`}
              className="profile-image-lg mr-2"
            />
            <button
              className="header-item btn btn-outline-danger"
              onClick={this.signOut}
            >
              Sign out
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <button
              className="header-item btn btn-primary"
              onClick={this.signIn}
            >
              Sign in
            </button>
          </Fragment>
        )}
      </div>
    );
  }
}

export default UserStatus;
