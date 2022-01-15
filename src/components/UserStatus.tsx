import React, { Fragment, useState } from "react";
import Collapsible from "react-collapsible";
import { authenticationService } from "../context";
import { SignedInUser } from "../types";

interface Props {
  user: SignedInUser | null;
  onSignOut: () => void;
}

function UserStatus(props: Props) {
  const { user, onSignOut } = props;

  const [showUserOptions, setShowUserOptions] = useState(false);

  return (
    <div className="d-flex justify-content-start align-items-center">
      {user ? (
        <Fragment>
          <div>
            <div onClick={() => setShowUserOptions(!showUserOptions)}>
              <img
                src={user.photoURL || ""}
                alt={`${user.displayName}`}
                className="profile-image-lg ml-2"
              />
              <span className="header-item ml-2">{user.displayName}</span>
            </div>
            <Collapsible
              trigger=""
              open={showUserOptions}
              easing="cubic-bezier(0.68, -0.55, 0.265, 1.55)"
            >
              <button
                className="header-item btn btn-outline-danger mt-3"
                onClick={() => {
                  onSignOut();
                  authenticationService.signOut();
                }}
              >
                Sign out
              </button>
            </Collapsible>
          </div>
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
