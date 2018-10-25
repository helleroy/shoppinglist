import React, { Component } from "react";
import { arrayMove } from "react-sortable-hoc";
import "./App.css";
import { authenticationService, listService, userService } from "./context";
import WelcomeJumbotron from "./components/WelcomeJumbotron";
import AppHeader from "./components/AppHeader";
import ShoppingLists from "./components/ShoppingLists";
import { mergeShoppingLists } from "./utils/shoppingLists";

const initialState = {
  user: null,
  shoppingLists: []
};

class App extends Component {
  constructor() {
    super();

    this.state = initialState;
  }

  componentDidMount() {
    authenticationService.handleAuthStateChanged(async user => {
      if (user) {
        this.setState({ user });

        userService.updateUser(user);
        listService.ownedShoppingListListener(user, ownedShoppingLists =>
          this.onListsUpdate(ownedShoppingLists)
        );
        listService.sharedShoppingListsListener(user, sharedShoppingLists =>
          this.onListsUpdate(sharedShoppingLists)
        );
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

  onListsUpdate = updatedShoppingLists => {
    const mergedShoppingLists = mergeShoppingLists(
      this.state.shoppingLists,
      updatedShoppingLists
    );

    const shoppingLists = listService.restoreShoppingListOrder(
      mergedShoppingLists
    );

    this.setState({ shoppingLists });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
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
