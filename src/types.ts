export interface SignedInUser extends firebase.User {}

export interface User {
  id: string;
  displayName: string;
  email: string;
  messagingToken: string;
  photoURL: string;
}

export interface ShoppingListItem {
  id: string;
  checked: boolean;
  name: string;
}

export interface ShoppingList {
  id: string;
  name: string;
  owner: User;
  sharedWith: Array<User>;
}

export interface Message {}
