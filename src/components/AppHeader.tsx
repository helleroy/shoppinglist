import React, { useState } from "react";
import Collapsible from "react-collapsible";
import CreateShoppingList from "./CreateShoppingList";
import UserStatus from "./UserStatus";
import { ShoppingList, SignedInUser } from "../types";

interface Props {
  user: SignedInUser | null;
  shoppingLists: Array<ShoppingList>;
  onSignOut: () => void;
}

function AppHeader(props: Props) {
  const { user, shoppingLists, onSignOut } = props;

  const [showCreateList, setShowCreateList] = useState(false);

  return (
    <div>
      <div className="col-sm-5 mb-3 d-inline-flex justify-content-between">
        <UserStatus user={user} onSignOut={onSignOut} />
        {shoppingLists.length > 0 && user && (
          <button
            onClick={() => setShowCreateList(!showCreateList)}
            className="btn btn-primary button-square"
          >
            <i className="fas fa-plus" />
          </button>
        )}
      </div>
      {shoppingLists.length > 0 && user && (
        <Collapsible
          trigger=""
          open={showCreateList}
          easing="cubic-bezier(0.68, -0.55, 0.265, 1.55)"
        >
          <div className="col-sm-5 mb-3">
            <CreateShoppingList
              user={user}
              onSubmit={() => setShowCreateList(false)}
            />
          </div>
        </Collapsible>
      )}
    </div>
  );
}

export default AppHeader;
