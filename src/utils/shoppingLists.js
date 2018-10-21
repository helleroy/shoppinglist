import _ from "lodash";

export function mergeShoppingLists(oldLists, newLists) {
  return _.uniqBy([...newLists, ...oldLists], "id");
}
