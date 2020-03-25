import React from "react";
import ShoppingList from "./ShoppingList";
import { SignedInUser, ShoppingList as ShoppingListType } from "../types";

interface Props {
  items: Array<ShoppingListType>;
  user: SignedInUser | null;
}

function ShoppingLists(props: Props) {
  const { user, items } = props;

  if (!user) {
    return null;
  }

  return (
    <div className="snap-scrollable-container-horizontal">
      {items.map((list: ShoppingListType) => (
        <ShoppingList key={list.id} list={list} signedInUser={user} />
      ))}
    </div>
  );
}

export default ShoppingLists;
