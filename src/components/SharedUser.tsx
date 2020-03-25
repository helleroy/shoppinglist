import React from "react";
import { listService } from "../context";
import { ShoppingList, SignedInUser, User } from "../types";

interface Props {
  list: ShoppingList;
  signedInUser: SignedInUser | null;
  sharedUser: User;
}

function SharedUser(props: Props) {
  const { list, sharedUser, signedInUser } = props;

  const signedInUserId = (signedInUser && signedInUser.uid) || "";
  const ownerIsSignedInUser = list.owner && list.owner.id === signedInUserId;
  const userIsSignedInUser = sharedUser.id === signedInUserId;
  const canRemove = ownerIsSignedInUser || userIsSignedInUser;

  const firstName = sharedUser.displayName.split(" ")[0];

  return (
    <div key={sharedUser.id} className="input-group">
      <div className="input-group-prepend">
        <div className="input-group-text d-flex align-items-center">
          <img
            src={sharedUser.photoURL}
            alt={`${sharedUser.displayName}`}
            className="profile-image-sm mr-2"
          />
          <span>{firstName}</span>
        </div>
      </div>
      <div className="input-group-append">
        {canRemove && (
          <button
            className="btn btn-danger"
            onClick={() => listService.removeUserFromList(list, sharedUser)}
          >
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  );
}

export default SharedUser;
