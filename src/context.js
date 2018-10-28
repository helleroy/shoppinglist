import { FirebaseApp } from "./firebase/app";
import { AuthenticationService } from "./services/AuthenticationService";
import { ShoppingListService } from "./services/ShoppingListService";
import { UserService } from "./services/UserService";
import { ShoppingListAdapter } from "./adapters/ShoppingListAdapter";
import { UserAdapter } from "./adapters/UserAdapter";
import { AuthenticationAdapter } from "./adapters/AuthenticationAdapter";
import { BrowserLocalStorageAdapter } from "./adapters/BrowserLocalStorageAdapter";
import { MessagingAdapter } from "./adapters/MessagingAdapter";
import { MessagingService } from "./services/MessagingService";

const firebaseApp = new FirebaseApp();

const shoppingListAdapter = new ShoppingListAdapter(firebaseApp.db);

const userAdapter = new UserAdapter(firebaseApp.db);

const browserLocalStorageAdapter = new BrowserLocalStorageAdapter(
  window.localStorage
);

const authenticationAdapter = new AuthenticationAdapter(firebaseApp.auth);

const messagingAdapter = new MessagingAdapter(
  firebaseApp.messaging,
  firebaseApp.app.options.projectId
);

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
