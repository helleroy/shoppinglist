import { docWithId } from "../utils/firebase";
import { ShoppingList, ShoppingListItem, SignedInUser, User } from "../types";

export class ShoppingListAdapter {
  _db: firebase.firestore.Firestore;

  constructor(db: firebase.firestore.Firestore) {
    this._db = db;
  }

  async createShoppingList(user: SignedInUser, name: string) {
    try {
      return this._db
        .collection("shoppinglists")
        .add({ owner: user.uid, name, sharedWith: [] });
    } catch (error) {
      console.log(error);
    }
  }

  async removeShoppingList(shoppingList: ShoppingList) {
    try {
      return this._db.doc(`shoppinglists/${shoppingList.id}`).delete();
    } catch (error) {
      console.log(error);
    }
  }

  async removeAllItemsFromShoppingList(shoppingList: ShoppingList) {
    try {
      const itemsSnapshot = await this._db
        .collection(`shoppinglists/${shoppingList.id}/items`)
        .get();

      const batch = this._db.batch();

      itemsSnapshot.forEach(doc => batch.delete(doc.ref));

      await batch.commit();
    } catch (error) {
      console.log(error);
    }
  }

  async addItemToShoppingList(
    shoppingList: ShoppingList,
    item: ShoppingListItem
  ) {
    try {
      return this._db
        .collection(`shoppinglists/${shoppingList.id}/items`)
        .add({ name: item.name, checked: false });
    } catch (error) {
      console.log(error);
    }
  }

  async removeItemFromShoppingList(
    shoppingList: ShoppingList,
    item: ShoppingListItem
  ) {
    try {
      return this._db
        .doc(`shoppinglists/${shoppingList.id}/items/${item.id}`)
        .delete();
    } catch (error) {
      console.log(error);
    }
  }

  async updateListName(shoppingList: ShoppingList, name: string) {
    try {
      return this._db.doc(`shoppinglists/${shoppingList.id}`).update({ name });
    } catch (error) {
      console.log(error);
    }
  }

  async updateSharedWith(shoppingList: ShoppingList, users: Array<User>) {
    try {
      const userIds = users.map(u => u.id);

      return this._db
        .doc(`shoppinglists/${shoppingList.id}`)
        .update({ sharedWith: userIds });
    } catch (error) {
      console.log(error);
    }
  }

  async updateItem(shoppingList: ShoppingList, item: ShoppingListItem) {
    const updatedItem = { name: item.name, checked: item.checked };

    try {
      return this._db
        .doc(`shoppinglists/${shoppingList.id}/items/${item.id}`)
        .update(updatedItem);
    } catch (error) {
      console.log(error);
    }
  }

  ownedShoppingListListener(
    user: SignedInUser,
    callback: (shoppingLists: Array<ShoppingList>) => void
  ) {
    try {
      return this._db
        .collection("shoppinglists")
        .where("owner", "==", user.uid)
        .onSnapshot(async querySnapshot => {
          const shoppingLists = querySnapshot.docs.map(docWithId);
          callback(shoppingLists);
        });
    } catch (error) {
      console.log(error);
    }
  }

  sharedShoppingListsListener(
    user: SignedInUser,
    callback: (shoppingLists: Array<ShoppingList>) => void
  ) {
    try {
      return this._db
        .collection("shoppinglists")
        .where("sharedWith", "array-contains", user.uid)
        .onSnapshot(async querySnapshot => {
          const shoppingLists = querySnapshot.docs.map(docWithId);
          callback(shoppingLists);
        });
    } catch (error) {
      console.log(error);
    }
  }

  itemListener(
    shoppingList: ShoppingList,
    callback: (items: Array<ShoppingListItem>) => void
  ) {
    try {
      return this._db
        .collection(`shoppinglists/${shoppingList.id}/items`)
        .onSnapshot(querySnapshot => {
          const items = querySnapshot.docs.map(docWithId);
          callback(items);
        });
    } catch (error) {
      console.log(error);
    }
  }
}
