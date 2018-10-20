import { FirebaseApp } from "./firebase/app";
import { AuthenticationService } from "./firebase/AuthenticationService";
import { ListService } from "./firebase/ListService";
import { UserService } from "./firebase/UserService";

const firebaseApp = new FirebaseApp();

export const authenticationService = new AuthenticationService(
  firebaseApp.get()
);

export const userService = new UserService(firebaseApp.get());

export const listService = new ListService(firebaseApp.get(), userService);
