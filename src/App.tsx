import React, { Component } from "react";
import { arrayMove, SortEnd } from "react-sortable-hoc";
import "./App.css";
import {
  authenticationService,
  listService,
  messagingService,
  userService
} from "./context";
import WelcomeJumbotron from "./components/WelcomeJumbotron";
import AppHeader from "./components/AppHeader";
import ShoppingLists from "./components/ShoppingLists";
import { mergeShoppingLists } from "./utils/shoppingLists";
import { Message, ShoppingList, SignedInUser } from "./types";

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
  notification: null
};

class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = initialState;
  }

  componentDidMount() {
    authenticationService.handleAuthStateChanged(async (user: SignedInUser) => {
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
        messagingService.listenForRefreshedToken(user);
        messagingService.onMessage((message: Message) => {
          this.setState({ notification: message });
        });
      } else {
        this.setState({ user: null });
      }
    });
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
    const shoppingLists = listService.restoreShoppingListOrder(
      updatedShoppingLists
    );

    this.setState({ shoppingLists });
  };

  onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    const shoppingLists = arrayMove(
      this.state.shoppingLists,
      oldIndex,
      newIndex
    );

    this.setState({ shoppingLists });

    listService.saveShoppingListOrder(shoppingLists);
  };

  render() {
    const { user, shoppingLists } = this.state;

    return (
      <div className="container">
        <header>
          <AppHeader
            user={user}
            shoppingLists={shoppingLists}
            onSignOut={() => this.setState(initialState)}
          />
        </header>
        <main className="main row">
          <div className="col">
            {shoppingLists.length === 0 && <WelcomeJumbotron user={user} />}
            <ShoppingLists
              items={shoppingLists}
              user={user}
              onSortEnd={this.onSortEnd}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default App;