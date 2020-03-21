import _ from "lodash";
import { ShoppingList } from "../types";

export function mergeShoppingLists(
  oldLists: Array<ShoppingList>,
  newLists: Array<ShoppingList>
): Array<ShoppingList> {
  return _.uniqBy([...newLists, ...oldLists], "id");
}
