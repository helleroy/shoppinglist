import React, { Component, Fragment } from "react";
import { authenticationService } from "../context";

class UserStatus extends Component {
  async signIn() {
    await authenticationService.signInWithGoogle();
  }

  signOut = async () => {
    this.props.onSignOut();
    await authenticationService.signOut();
  };

  render() {
    const { user } = this.props;

    return (
      <div className="d-flex justify-content-start align-items-center">
        {user ? (
          <Fragment>
            <button
              className="header-item btn btn-outline-danger"
              onClick={this.signOut}
            >
              Sign out
            </button>
            <img
              src={user.photoURL}
              alt={`${user.displayName}`}
              className="profile-image-lg ml-2"
            />
            <span className="header-item ml-2">{user.displayName}</span>
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
