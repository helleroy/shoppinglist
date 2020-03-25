import React from "react";
import CreateShoppingList from "../components/CreateShoppingList";
import UserStatus from "../components/UserStatus";
import { ShoppingList, SignedInUser } from "../types";

interface Props {
  user: SignedInUser | null;
  shoppingLists: Array<ShoppingList>;
  onSignOut: Function;
}

function AppHeader(props: Props) {
  const { user, shoppingLists, onSignOut } = props;

  return (
    <div>
      <div className="col-sm-5 mb-3">
        <UserStatus user={user} onSignOut={onSignOut} />
      </div>
      <div className="col-sm-6 mb-3">
        {shoppingLists.length > 0 && <CreateShoppingList user={user} />}
      </div>
    </div>
  );
}

export default AppHeader;
