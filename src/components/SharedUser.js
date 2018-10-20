import React, { Component } from "react";
import { listService } from "../context";

class SharedUser extends Component {
  render() {
    const { list, user } = this.props;

    return (
      <div key={user.id} className="input-group">
        <div className="input-group-prepend">
          <div className="input-group-text d-flex align-items-center">
            <span className="mr-2">{user.displayName}</span>
            <img
              src={user.photoURL}
              alt={`${user.displayName}`}
              className="shared-user-profile-image"
            />
          </div>
        </div>
        <div className="input-group-append">
          <button
            className="btn btn-danger"
            onClick={() => listService.removeUserFromList(list, user)}
          >
            <i className="fas fa-times" />
          </button>
        </div>
      </div>
    );
  }
}

export default SharedUser;
