import React, { Component } from "react";
import CreateShoppingList from "../components/CreateShoppingList";
import UserStatus from "../components/UserStatus";

class AppHeader extends Component {
  render() {
    const { user, shoppingLists } = this.props;

    return (
      <div className="row justify-content-between mt-3">
        <div className="col-sm-5 mb-3">
          <UserStatus user={user} />
        </div>
        <div className="col-sm-6 mb-3">
          {shoppingLists.length > 0 && <CreateShoppingList user={user} />}
        </div>
      </div>
    );
  }
}

export default AppHeader;
