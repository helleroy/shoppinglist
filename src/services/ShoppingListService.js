import _ from "lodash";
import { addToList, removeFromList } from "../utils/list";

export class ShoppingListService {
  _shoppingListAdapter;
  _userAdapter;
  _ownedShoppingListUnsubscriber;
  _sharedShoppingListUnsubscriber;
  _itemUnsubcribers;

  constructor(shoppingListAdapter, userAdapter) {
    this._shoppingListAdapter = shoppingListAdapter;
    this._userAdapter = userAdapter;
    this._ownedShoppingListUnsubscriber = null;
    this._sharedShoppingListUnsubscriber = null;
    this._itemUnsubcribers = {};
  }

  async createShoppingList(user, name) {
    try {
      return this._shoppingListAdapter.createShoppingList(user, name);
    } catch (error) {
      console.log(error);
    }
  }

  async removeShoppingList(shoppingList) {
    try {
      await this._shoppingListAdapter.removeAllItemsFromShoppingList(
        shoppingList
      );
      return this._shoppingListAdapter.removeShoppingList(shoppingList);
    } catch (error) {
      console.log(error);
    }
  }

  async addItemToShoppingList(shoppingList, item) {
    try {
      return this._shoppingListAdapter.addItemToShoppingList(
        shoppingList,
        item
      );
    } catch (error) {
      console.log(error);
    }
  }

  async removeItemFromShoppingList(shoppingList, item) {
    try {
      return this._shoppingListAdapter.removeItemFromShoppingList(
        shoppingList,
        item
      );
    } catch (error) {
      console.log(error);
    }
  }

  async updateListName(shoppingList, name) {
    if (name.length === 0) {
      return;
    }

    try {
      return this._shoppingListAdapter.updateListName(shoppingList, name);
    } catch (error) {
      console.log(error);
    }
  }

  async updateSharedWith(shoppingList, users) {
    try {
      return this._shoppingListAdapter.updateSharedWith(shoppingList, users);
    } catch (error) {
      console.log(error);
    }
  }

  async updateItem(shoppingList, item) {
    try {
      return this._shoppingListAdapter.updateItem(shoppingList, item);
    } catch (error) {
      console.log(error);
    }
  }

  async addUserToList(shoppingList, email) {
    const user = await this._userAdapter.getUserByEmail(email);

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
      .map(userId => this._userAdapter.getUserById(userId))
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
      this._ownedShoppingListUnsubscriber = this._shoppingListAdapter.ownedShoppingListListener(
        user,
        async shoppingLists => {
          const shoppingListsWithUsers = await this.populateUserData(
            shoppingLists
          );
          callback(shoppingListsWithUsers);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  sharedShoppingListsListener(user, callback) {
    this.unsubscribeSharedShoppingListListener();

    try {
      this._sharedShoppingListUnsubscriber = this._shoppingListAdapter.sharedShoppingListsListener(
        user,
        async shoppingLists => {
          const shoppingListsWithUsers = await this.populateUserData(
            shoppingLists
          );
          callback(shoppingListsWithUsers);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  itemListener(shoppingList, callback) {
    this.unsubscribeItemListener(shoppingList);

    try {
      this._itemUnsubcribers[
        shoppingList.id
      ] = this._shoppingListAdapter.itemListener(shoppingList, callback);
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
