import React, { Component } from "react";
import SharedUser from "./SharedUser";

class ShoppingListHeader extends Component {
  render() {
    const { list } = this.props;

    return (
      <div>
        <div>
          <h2 className="display-4">{list.name}</h2>
          <h4 className="lead">Created by {list.owner}</h4>
        </div>
        <div>
          {list.sharedWith.length > 0 && (
            <div>
              <h4 className="lead m-0">Shared with</h4>
              <div className="d-flex flex-wrap justify-content-start">
                {list.sharedWith.map(user => (
                  <div key={user.id} className="mt-2 mr-2">
                    <SharedUser user={user} list={list} />
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
