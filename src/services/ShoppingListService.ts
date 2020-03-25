import firebase from "firebase";
import _ from "lodash";
import { addToList, removeFromList } from "../utils/list";
import { ShoppingListAdapter } from "../adapters/ShoppingListAdapter";
import { UserAdapter } from "../adapters/UserAdapter";
import { BrowserLocalStorageAdapter } from "../adapters/BrowserLocalStorageAdapter";
import {
  BaseShoppingList,
  ShoppingList,
  ShoppingListItem,
  SignedInUser,
  User,
} from "../types";

const LIST_ORDER_KEY = "shoppinglist-order";

export class ShoppingListService {
  _shoppingListAdapter: ShoppingListAdapter;
  _userAdapter: UserAdapter;
  _localStorageAdapter: BrowserLocalStorageAdapter;
  _ownedShoppingListUnsubscribe: firebase.Unsubscribe | undefined;
  _sharedShoppingListUnsubscribe: firebase.Unsubscribe | undefined;
  _itemUnsubscribe: { [id: string]: firebase.Unsubscribe | undefined };

  constructor(
    shoppingListAdapter: ShoppingListAdapter,
    userAdapter: UserAdapter,
    localStorageAdapter: BrowserLocalStorageAdapter
  ) {
    this._shoppingListAdapter = shoppingListAdapter;
    this._userAdapter = userAdapter;
    this._localStorageAdapter = localStorageAdapter;
    this._itemUnsubscribe = {};
  }

  async createShoppingList(user: SignedInUser, name: string): Promise<void> {
    try {
      await this._shoppingListAdapter.createShoppingList(user, name);
    } catch (error) {
      console.log(error);
    }
  }

  async removeShoppingList(shoppingList: ShoppingList): Promise<void> {
    try {
      await this._shoppingListAdapter.removeAllItemsFromShoppingList(
        shoppingList
      );
      await this._shoppingListAdapter.removeShoppingList(shoppingList);
    } catch (error) {
      console.log(error);
    }
  }

  async addItemToShoppingList(
    shoppingList: ShoppingList,
    itemName: string
  ): Promise<void> {
    try {
      await this._shoppingListAdapter.addItemToShoppingList(
        shoppingList,
        itemName
      );
    } catch (error) {
      console.log(error);
    }
  }

  async removeItemFromShoppingList(
    shoppingList: ShoppingList,
    item: ShoppingListItem
  ): Promise<void> {
    try {
      await this._shoppingListAdapter.removeItemFromShoppingList(
        shoppingList,
        item
      );
    } catch (error) {
      console.log(error);
    }
  }

  async updateListName(
    shoppingList: ShoppingList,
    name: string
  ): Promise<void> {
    if (name.length === 0) {
      return;
    }

    try {
      await this._shoppingListAdapter.updateListName(shoppingList, name);
    } catch (error) {
      console.log(error);
    }
  }

  async updateSharedWith(
    shoppingList: ShoppingList,
    users: Array<User>
  ): Promise<void> {
    try {
      await this._shoppingListAdapter.updateSharedWith(shoppingList, users);
    } catch (error) {
      console.log(error);
    }
  }

  async updateItem(
    shoppingList: ShoppingList,
    item: ShoppingListItem
  ): Promise<void> {
    try {
      await this._shoppingListAdapter.updateItem(shoppingList, item);
    } catch (error) {
      console.log(error);
    }
  }

  async addUserToList(
    shoppingList: ShoppingList,
    email: string
  ): Promise<void> {
    const user = await this._userAdapter.getUserByEmail(email);

    if (user) {
      const users = addToList(shoppingList.sharedWith, user);

      await this.updateSharedWith(shoppingList, users);
    }
  }

  async removeUserFromList(
    shoppingList: ShoppingList,
    user: User
  ): Promise<void> {
    const users = removeFromList(shoppingList.sharedWith, user);

    await this.updateSharedWith(shoppingList, users);
  }

  saveShoppingListOrder(shoppingLists: Array<ShoppingList>): void {
    const shoppingListOrder = shoppingLists.reduce(
      (listOrder: { [id: string]: number }, currentList, index) => {
        listOrder[currentList.id] = index;
        return listOrder;
      },
      {}
    );

    this._localStorageAdapter.setItem(
      LIST_ORDER_KEY,
      JSON.stringify(shoppingListOrder)
    );
  }

  restoreShoppingListOrder(
    shoppingLists: Array<ShoppingList>
  ): Array<ShoppingList> {
    const shoppingListOrder = this._localStorageAdapter.getItem(LIST_ORDER_KEY);

    if (shoppingListOrder) {
      return _.sortBy(
        shoppingLists,
        (shoppingList) => shoppingListOrder[shoppingList.id]
      );
    }

    return shoppingLists;
  }

  async populateUserData(
    baseShoppingLists: Array<BaseShoppingList>
  ): Promise<Array<ShoppingList>> {
    const userByIdPromises = _.chain(baseShoppingLists)
      .flatMap((list) => [...list.sharedWith, list.owner])
      .uniq()
      .map((userId) => this._userAdapter.getUserById(userId))
      .value();

    const isUser = (user: User | null): user is User => user !== null;
    const uniqueUsers = await Promise.all(userByIdPromises);
    const uniqueNonNullUsers = uniqueUsers.filter(isUser);

    const usersById = _.keyBy(uniqueNonNullUsers, "id");

    return baseShoppingLists.map((list) => {
      return {
        id: list.id,
        name: list.name,
        owner: usersById[list.owner] || undefined,
        sharedWith: list.sharedWith.map((userId) => {
          return usersById[userId];
        }),
      };
    });
  }

  ownedShoppingListListener(
    user: SignedInUser,
    callback: (shoppingLists: Array<ShoppingList>) => void
  ): void {
    this.unsubscribeOwnedShoppingListListener();

    try {
      this._ownedShoppingListUnsubscribe = this._shoppingListAdapter.ownedShoppingListListener(
        user,
        async (shoppingLists) => {
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

  sharedShoppingListsListener(
    user: SignedInUser,
    callback: (shoppingLists: Array<ShoppingList>) => void
  ): void {
    this.unsubscribeSharedShoppingListListener();

    try {
      this._sharedShoppingListUnsubscribe = this._shoppingListAdapter.sharedShoppingListsListener(
        user,
        async (shoppingLists) => {
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

  itemListener(
    shoppingList: ShoppingList,
    callback: (items: Array<ShoppingListItem>) => void
  ): void {
    this.unsubscribeItemListener(shoppingList);

    try {
      this._itemUnsubscribe[
        shoppingList.id
      ] = this._shoppingListAdapter.itemListener(shoppingList, callback);
    } catch (error) {
      console.log(error);
    }
  }

  unsubscribeOwnedShoppingListListener(): void {
    if (this._ownedShoppingListUnsubscribe) {
      this._ownedShoppingListUnsubscribe();
      this._ownedShoppingListUnsubscribe = undefined;
    }
  }

  unsubscribeSharedShoppingListListener(): void {
    if (this._sharedShoppingListUnsubscribe) {
      this._sharedShoppingListUnsubscribe();
      this._sharedShoppingListUnsubscribe = undefined;
    }
  }

  unsubscribeItemListener(shoppingList: ShoppingList): void {
    const shoppingListId = shoppingList.id;
    const itemUnsubscribe = this._itemUnsubscribe[shoppingListId];

    if (itemUnsubscribe) {
      itemUnsubscribe();
      delete this._itemUnsubscribe[shoppingListId];
    }
  }
}
