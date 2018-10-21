import React, { Component } from "react";
import { listService } from "../context";

class SharedUser extends Component {
  render() {
    const { list, sharedUser, signedInUser } = this.props;

    return (
      <div key={sharedUser.id} className="input-group">
        <div className="input-group-prepend">
          <div className="input-group-text d-flex align-items-center">
            <span className="mr-2">{sharedUser.displayName}</span>
            <img
              src={sharedUser.photoURL}
              alt={`${sharedUser.displayName}`}
              className="profile-image-sm"
            />
          </div>
        </div>
        <div className="input-group-append">
          <button
            className="btn btn-danger"
            onClick={() => listService.removeUserFromList(list, sharedUser)}
            disabled={
              list.owner !== signedInUser.uid &&
              sharedUser.id !== signedInUser.uid
            }
          >
            <i className="fas fa-times" />
          </button>
        </div>
      </div>
    );
  }
}

export default SharedUser;
