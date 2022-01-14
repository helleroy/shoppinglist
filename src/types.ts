import { User as FirebaseUser } from "firebase/auth";
import { Messaging } from "firebase/messaging";

export interface SignedInUser extends FirebaseUser {}

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

export interface BaseShoppingList {
  id: string;
  name: string;
  owner: string;
  sharedWith: Array<string>;
}

export interface ShoppingList {
  id: string;
  name: string;
  owner?: User;
  sharedWith: Array<User>;
}

export interface Message extends Messaging {}
