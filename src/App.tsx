import React, { Component, RefObject } from "react";
import "./App.css";
import {
  authenticationService,
  listService,
  messagingService,
  userService,
} from "./context";
import WelcomeJumbotron from "./components/WelcomeJumbotron";
import AppHeader from "./components/AppHeader";
import ShoppingLists from "./components/ShoppingLists";
import { mergeShoppingLists } from "./utils/shoppingLists";
import { Message, ShoppingList, SignedInUser } from "./types";

interface Props {
  updateFound: boolean;
}

interface State {
  user: SignedInUser | null;
  ownedShoppingLists: Array<ShoppingList>;
  sharedShoppingLists: Array<ShoppingList>;
  shoppingLists: Array<ShoppingList>;
  notification: Message | null;
}

const initialState: State = {
  user: null,
  ownedShoppingLists: [],
  sharedShoppingLists: [],
  shoppingLists: [],
  notification: null,
};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = initialState;
  }

  componentDidMount() {
    authenticationService.handleAuthStateChanged(
      (user: SignedInUser | null) => {
        if (user) {
          this.setState({ user });

          userService.updateUser(user);

          listService.ownedShoppingListListener(
            user,
            (ownedShoppingLists: Array<ShoppingList>) =>
              this.updateOwnedLists(ownedShoppingLists)
          );
          listService.sharedShoppingListsListener(
            user,
            (sharedShoppingLists: Array<ShoppingList>) =>
              this.updateSharedLists(sharedShoppingLists)
          );

          messagingService.requestPermission(user);
          messagingService.onMessage((message: Message) => {
            this.setState({ notification: message });
          });
        } else {
          this.setState({ user: null });
        }
      }
    );
  }

  componentWillUnmount() {
    listService.unsubscribeSharedShoppingListListener();
    listService.unsubscribeOwnedShoppingListListener();
    authenticationService.unsubscribeAuthStateChangedListener();
  }

  updateOwnedLists = (ownedShoppingLists: Array<ShoppingList>) => {
    const mergedShoppingLists = mergeShoppingLists(
      this.state.sharedShoppingLists,
      ownedShoppingLists
    );

    this.setState({ ownedShoppingLists });
    this.updateShoppingLists(mergedShoppingLists);
  };

  updateSharedLists = (sharedShoppingLists: Array<ShoppingList>) => {
    const mergedShoppingLists = mergeShoppingLists(
      this.state.ownedShoppingLists,
      sharedShoppingLists
    );

    this.setState({ sharedShoppingLists });
    this.updateShoppingLists(mergedShoppingLists);
  };

  updateShoppingLists = (updatedShoppingLists: Array<ShoppingList>) => {
    const shoppingLists =
      listService.restoreShoppingListOrder(updatedShoppingLists);

    this.setState({ shoppingLists });
  };

  onSort = (
    sortedShoppingLists: Array<ShoppingList>,
    ref: RefObject<HTMLElement>
  ) => {
    if (this.state.shoppingLists !== sortedShoppingLists) {
      listService.saveShoppingListOrder(sortedShoppingLists);

      this.setState({ shoppingLists: sortedShoppingLists }, () => {
        if (ref.current) {
          ref.current.scrollIntoView({
            behavior: "smooth",
          });
        }
      });
    }
  };

  render() {
    const { updateFound } = this.props;
    const { user, shoppingLists } = this.state;

    return (
      <div className="pt-3">
        <header>
          {updateFound && (
            <div className="alert alert-danger" role="alert">
              <button
                onClick={() => window.location.reload()}
                className="btn btn-secondary"
              >
                Installer oppdatering
              </button>
            </div>
          )}
          <AppHeader
            user={user}
            shoppingLists={shoppingLists}
            onSignOut={() => this.setState(initialState)}
          />
        </header>
        <main>
          {shoppingLists.length === 0 && <WelcomeJumbotron user={user} />}
          <ShoppingLists
            shoppingLists={shoppingLists}
            user={user}
            onSort={this.onSort}
          />
        </main>
      </div>
    );
  }
}

export default App;
