import React from "react";
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

  return (
    <div>
      <div className="col-sm-5 mb-3">
        <UserStatus user={user} onSignOut={onSignOut} />
      </div>
      <div className="col-sm-6 mb-3">
        {shoppingLists.length > 0 && user && <CreateShoppingList user={user} />}
      </div>
    </div>
  );
}

export default AppHeader;
