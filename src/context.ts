import { Firebase } from "./firebase/app";
import { AuthenticationService } from "./services/AuthenticationService";
import { ShoppingListService } from "./services/ShoppingListService";
import { UserService } from "./services/UserService";
import { ShoppingListAdapter } from "./adapters/ShoppingListAdapter";
import { UserAdapter } from "./adapters/UserAdapter";
import { AuthenticationAdapter } from "./adapters/AuthenticationAdapter";
import { BrowserLocalStorageAdapter } from "./adapters/BrowserLocalStorageAdapter";
import { MessagingAdapter } from "./adapters/MessagingAdapter";
import { MessagingService } from "./services/MessagingService";

const firebaseOptions = {
  apiKey: "AIzaSyC75sci6JhjJtxF5773owNIyIkVKEvw78U",
  authDomain: "handleliste-f03d5.firebaseapp.com",
  databaseURL: "https://handleliste-f03d5.firebaseio.com",
  projectId: "handleliste-f03d5",
  storageBucket: "handleliste-f03d5.appspot.com",
  messagingSenderId: "653122939571",
  appId: "1:653122939571:web:b2d611dd62cf7a00299ec6",
};

const firebaseApp = new Firebase(firebaseOptions);

const shoppingListAdapter = new ShoppingListAdapter(firebaseApp.db);

const userAdapter = new UserAdapter(firebaseApp.db);

const browserLocalStorageAdapter = new BrowserLocalStorageAdapter(
  window.localStorage
);

const authenticationAdapter = new AuthenticationAdapter(firebaseApp.auth);

const messagingAdapter = new MessagingAdapter(firebaseApp.messaging);

export const messagingService = new MessagingService(
  messagingAdapter,
  userAdapter
);

export const authenticationService = new AuthenticationService(
  authenticationAdapter
);

export const userService = new UserService(userAdapter);

export const listService = new ShoppingListService(
  shoppingListAdapter,
  userAdapter,
  browserLocalStorageAdapter
);
