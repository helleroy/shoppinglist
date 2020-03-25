import React, { Fragment } from "react";
import { authenticationService } from "../context";
import { SignedInUser } from "../types";

interface Props {
  user: SignedInUser | null;
  onSignOut: () => void;
}

function UserStatus(props: Props) {
  const { user, onSignOut } = props;

  return (
    <div className="d-flex justify-content-start align-items-center">
      {user ? (
        <Fragment>
          <button
            className="header-item btn btn-outline-danger"
            onClick={() => {
              onSignOut();
              authenticationService.signOut();
            }}
          >
            Sign out
          </button>
          <img
            src={user.photoURL || ""}
            alt={`${user.displayName}`}
            className="profile-image-lg ml-2"
          />
          <span className="header-item ml-2">{user.displayName}</span>
        </Fragment>
      ) : (
        <Fragment>
          <button
            className="header-item btn btn-primary"
            onClick={() => {
              authenticationService.signInWithGoogle();
            }}
          >
            Sign in
          </button>
        </Fragment>
      )}
    </div>
  );
}

export default UserStatus;
