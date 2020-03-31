import React from "react";
import ShoppingList from "./ShoppingList";
import { ShoppingList as ShoppingListType, SignedInUser } from "../types";
import { moveElementLeft, moveElementRight } from "../utils/list";

interface Props {
  shoppingLists: Array<ShoppingListType>;
  user: SignedInUser | null;
  onSort: (list: Array<ShoppingListType>) => void;
}

function ShoppingLists(props: Props) {
  const { user, shoppingLists, onSort } = props;

  if (!user) {
    return null;
  }

  return (
    <div className="snap-scrollable-container-horizontal">
      {shoppingLists.map((list, index) => (
        <ShoppingList
          key={list.id}
          list={list}
          signedInUser={user}
          moveListLeft={
            index > 0
              ? () => onSort(moveElementLeft(shoppingLists, index))
              : null
          }
          moveListRight={
            index < shoppingLists.length - 1
              ? () => onSort(moveElementRight(shoppingLists, index))
              : null
          }
        />
      ))}
    </div>
  );
}

export default ShoppingLists;
