import React, { RefObject } from "react";
import ShoppingList from "./ShoppingList";
import { ShoppingList as ShoppingListType, SignedInUser } from "../types";
import { moveElementLeft, moveElementRight } from "../utils/list";

interface Props {
  shoppingLists: Array<ShoppingListType>;
  user: SignedInUser | null;
  onSort: (list: Array<ShoppingListType>, ref: RefObject<HTMLElement>) => void;
}

function ShoppingLists(props: Props) {
  const { user, shoppingLists, onSort } = props;

  if (!user) {
    return null;
  }

  return (
    <div className="snap-scrollable-container-horizontal pb-3">
      {shoppingLists.map((list, index) => (
        <ShoppingList
          key={list.id}
          list={list}
          signedInUser={user}
          moveListLeft={
            index > 0
              ? (ref: RefObject<HTMLElement>) =>
                  onSort(moveElementLeft(shoppingLists, index), ref)
              : null
          }
          moveListRight={
            index < shoppingLists.length - 1
              ? (ref: RefObject<HTMLElement>) =>
                  onSort(moveElementRight(shoppingLists, index), ref)
              : null
          }
        />
      ))}
    </div>
  );
}

export default ShoppingLists;
