import React, { Component } from "react";
import { listService } from "../context";

class SharedUser extends Component {
  render() {
    const { list, sharedUser, signedInUser } = this.props;

    const canRemove =
      list.owner.id === signedInUser.uid || sharedUser.id === signedInUser.uid;

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
}

export default SharedUser;
