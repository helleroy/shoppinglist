import firebase from "firebase";
import {
  BaseShoppingList,
  ShoppingList,
  ShoppingListItem,
  SignedInUser,
  User
} from "../types";

export class ShoppingListAdapter {
  _db: firebase.firestore.Firestore;

  constructor(db: firebase.firestore.Firestore) {
    this._db = db;
  }

  async createShoppingList(user: SignedInUser, name: string): Promise<void> {
    try {
      await this._db
        .collection("shoppinglists")
        .add({ owner: user.uid, name, sharedWith: [] });
    } catch (error) {
      console.log(error);
    }
  }

  async removeShoppingList(shoppingList: ShoppingList): Promise<void> {
    try {
      await this._db.doc(`shoppinglists/${shoppingList.id}`).delete();
    } catch (error) {
      console.log(error);
    }
  }

  async removeAllItemsFromShoppingList(
    shoppingList: ShoppingList
  ): Promise<void> {
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
  ): Promise<void> {
    try {
      await this._db
        .collection(`shoppinglists/${shoppingList.id}/items`)
        .add({ name: item.name, checked: false });
    } catch (error) {
      console.log(error);
    }
  }

  async removeItemFromShoppingList(
    shoppingList: ShoppingList,
    item: ShoppingListItem
  ): Promise<void> {
    try {
      await this._db
        .doc(`shoppinglists/${shoppingList.id}/items/${item.id}`)
        .delete();
    } catch (error) {
      console.log(error);
    }
  }

  async updateListName(
    shoppingList: ShoppingList,
    name: string
  ): Promise<void> {
    try {
      await this._db.doc(`shoppinglists/${shoppingList.id}`).update({ name });
    } catch (error) {
      console.log(error);
    }
  }

  async updateSharedWith(
    shoppingList: ShoppingList,
    users: Array<User>
  ): Promise<void> {
    try {
      const userIds = users.map(u => u.id);

      await this._db
        .doc(`shoppinglists/${shoppingList.id}`)
        .update({ sharedWith: userIds });
    } catch (error) {
      console.log(error);
    }
  }

  async updateItem(
    shoppingList: ShoppingList,
    item: ShoppingListItem
  ): Promise<void> {
    const updatedItem = { name: item.name, checked: item.checked };

    try {
      await this._db
        .doc(`shoppinglists/${shoppingList.id}/items/${item.id}`)
        .update(updatedItem);
    } catch (error) {
      console.log(error);
    }
  }

  ownedShoppingListListener(
    user: SignedInUser,
    callback: (shoppingLists: Array<BaseShoppingList>) => void
  ): firebase.Unsubscribe | undefined {
    try {
      return this._db
        .collection("shoppinglists")
        .where("owner", "==", user.uid)
        .onSnapshot(snapshot => {
          const shoppingLists = snapshot.docs.map(mapShoppingList);
          callback(shoppingLists);
        });
    } catch (error) {
      console.log(error);
    }
  }

  sharedShoppingListsListener(
    user: SignedInUser,
    callback: (shoppingLists: Array<BaseShoppingList>) => void
  ): firebase.Unsubscribe | undefined {
    try {
      return this._db
        .collection("shoppinglists")
        .where("sharedWith", "array-contains", user.uid)
        .onSnapshot(snapshot => {
          const shoppingLists = snapshot.docs.map(mapShoppingList);
          callback(shoppingLists);
        });
    } catch (error) {
      console.log(error);
    }
  }

  itemListener(
    shoppingList: ShoppingList,
    callback: (items: Array<ShoppingListItem>) => void
  ): firebase.Unsubscribe | undefined {
    try {
      return this._db
        .collection(`shoppinglists/${shoppingList.id}/items`)
        .onSnapshot(snapshot => {
          const items = snapshot.docs.map(mapShoppingListItem);
          callback(items);
        });
    } catch (error) {
      console.log(error);
    }
  }
}

function mapShoppingList(
  document: firebase.firestore.QueryDocumentSnapshot
): BaseShoppingList {
  return {
    id: document.id,
    name: document.data().name,
    owner: document.data().owner,
    sharedWith: document.data().sharedWith
  };
}

function mapShoppingListItem(
  document: firebase.firestore.QueryDocumentSnapshot
): ShoppingListItem {
  return {
    id: document.id,
    name: document.data().name,
    checked: document.data().checked
  };
}
