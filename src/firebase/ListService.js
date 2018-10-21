import firebase from "firebase/app";
import "firebase/firestore";
import _ from "lodash";
import { addToList, removeFromList } from "../utils/list";
import { docWithId } from "../utils/firebase";

export class ListService {
  _db;
  _userService;
  _ownedShoppingListUnsubscriber;
  _sharedShoppingListUnsubscriber;
  _itemUnsubcribers;

  constructor(firebaseApp, userService) {
    this._db = firebase.firestore(firebaseApp);
    this._userService = userService;
    this._ownedShoppingListUnsubscriber = null;
    this._sharedShoppingListUnsubscriber = null;
    this._itemUnsubcribers = {};

    this._db.settings({
      timestampsInSnapshots: true
    });
  }

  async createShoppingList(user, name) {
    try {
      return this._db
        .collection("shoppinglists")
        .add({ owner: user.uid, name, sharedWith: [] });
    } catch (error) {
      console.log(error);
    }
  }

  async removeShoppingList(shoppingList) {
    try {
      await this.removeAllItemsFromShoppingList(shoppingList);
      return this._db.doc(`shoppinglists/${shoppingList.id}`).delete();
    } catch (error) {
      console.log(error);
    }
  }

  async removeAllItemsFromShoppingList(shoppingList) {
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

  async addItemToShoppingList(shoppingList, item) {
    try {
      return this._db
        .collection(`shoppinglists/${shoppingList.id}/items`)
        .add({ name: item.name, checked: false });
    } catch (error) {
      console.log(error);
    }
  }

  async removeItemFromShoppingList(shoppingList, item) {
    try {
      return this._db
        .doc(`shoppinglists/${shoppingList.id}/items/${item.id}`)
        .delete();
    } catch (error) {
      console.log(error);
    }
  }

  async updateSharedWith(shoppingList, users) {
    try {
      const userIds = users.map(u => u.id);

      return this._db
        .doc(`shoppinglists/${shoppingList.id}`)
        .update({ sharedWith: userIds });
    } catch (error) {
      console.log(error);
    }
  }

  async updateItem(shoppingList, item) {
    const updatedItem = { name: item.name, checked: item.checked };

    try {
      return this._db
        .doc(`shoppinglists/${shoppingList.id}/items/${item.id}`)
        .update(updatedItem);
    } catch (error) {
      console.log(error);
    }
  }

  async addUserToList(shoppingList, email) {
    const user = await this._userService.getUserByEmail(email);

    if (user) {
      const users = addToList(shoppingList.sharedWith, user);

      await this.updateSharedWith(shoppingList, users);
    }
  }

  async removeUserFromList(shoppingList, user) {
    const users = removeFromList(shoppingList.sharedWith, user);

    await this.updateSharedWith(shoppingList, users);
  }

  async populateUserData(shoppingLists) {
    const userByIdPromises = _.chain(shoppingLists)
      .flatMap(list => [...list.sharedWith, list.owner])
      .uniq()
      .map(userId => this._userService.getUserById(userId))
      .value();

    const uniqueUsers = await Promise.all(userByIdPromises);

    const uniqueUserMap = _.keyBy(uniqueUsers, "id");

    return shoppingLists.map(list => {
      return {
        ...list,
        owner: uniqueUserMap[list.owner],
        sharedWith: list.sharedWith.map(userId => {
          return uniqueUserMap[userId];
        })
      };
    });
  }

  ownedShoppingListListener(user, callback) {
    this.unsubscribeOwnedShoppingListListener();

    try {
      this._ownedShoppingListUnsubscriber = this._db
        .collection("shoppinglists")
        .where("owner", "==", user.uid)
        .onSnapshot(async querySnapshot => {
          const shoppingLists = querySnapshot.docs.map(docWithId);

          const shoppingListsWithUsers = await this.populateUserData(
            shoppingLists
          );

          callback(shoppingListsWithUsers);
        });
    } catch (error) {
      console.log(error);
    }
  }

  sharedShoppingListsListener(user, callback) {
    this.unsubscribeSharedShoppingListListener();

    this._sharedShoppingListUnsubscriber = this._db
      .collection("shoppinglists")
      .where("sharedWith", "array-contains", user.uid)
      .onSnapshot(async querySnapshot => {
        const shoppingLists = querySnapshot.docs.map(docWithId);

        const shoppingListsWithUsers = await this.populateUserData(
          shoppingLists
        );

        callback(shoppingListsWithUsers);
      });
  }

  itemListener(shoppingList, callback) {
    this.unsubscribeItemListener(shoppingList);

    try {
      this._itemUnsubcribers[shoppingList.id] = this._db
        .collection(`shoppinglists/${shoppingList.id}/items`)
        .onSnapshot(querySnapshot => {
          const items = querySnapshot.docs.map(docWithId);

          callback(items);
        });
    } catch (error) {
      console.log(error);
    }
  }

  unsubscribeOwnedShoppingListListener() {
    if (this._ownedShoppingListUnsubscriber) {
      this._ownedShoppingListUnsubscriber();
      this._ownedShoppingListUnsubscriber = null;
    }
  }

  unsubscribeSharedShoppingListListener() {
    if (this._sharedShoppingListUnsubscriber) {
      this._sharedShoppingListUnsubscriber();
      this._sharedShoppingListUnsubscriber = null;
    }
  }

  unsubscribeItemListener(shoppingList) {
    const shoppingListId = shoppingList.id;
    if (this._itemUnsubcribers[shoppingListId]) {
      this._itemUnsubcribers[shoppingListId]();
      delete this._itemUnsubcribers[shoppingListId];
    }
  }
}
