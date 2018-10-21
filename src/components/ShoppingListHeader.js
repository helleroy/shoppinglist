import React, { Component } from "react";
import SharedUser from "./SharedUser";

class ShoppingListHeader extends Component {
  render() {
    const { list, signedInUser } = this.props;

    return (
      <div>
        <div>
          <h2 className="display-4">{list.name}</h2>
          <h4 className="lead d-inline-flex align-items-center">
            Created by
            <img
              src={list.owner.photoURL}
              alt={`${list.owner.displayName}`}
              className="profile-image-sm mx-2"
            />
            {list.owner.displayName}
          </h4>
        </div>
        <div>
          {list.sharedWith.length > 0 && (
            <div>
              <h4 className="lead m-0">Shared with</h4>
              <div className="d-flex flex-wrap justify-content-start">
                {list.sharedWith.map(sharedUser => (
                  <div key={sharedUser.id} className="mt-2 mr-2">
                    <SharedUser
                      sharedUser={sharedUser}
                      signedInUser={signedInUser}
                      list={list}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ShoppingListHeader;
