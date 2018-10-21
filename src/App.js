import React, { Component } from "react";
import "./App.css";
import ShoppingList from "./components/ShoppingList";
import { authenticationService, listService, userService } from "./context";
import WelcomeJumbotron from "./components/WelcomeJumbotron";
import AppHeader from "./components/AppHeader";
import { mergeShoppingLists } from "./utils/shoppingLists";

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      ownedShoppingLists: [],
      sharedShoppingLists: []
    };
  }

  componentDidMount() {
    authenticationService.handleAuthStateChanged(async user => {
      if (user) {
        this.setState({ user });

        userService.updateUser(user);
        listService.ownedShoppingListListener(user, ownedShoppingLists =>
          this.setState({ ownedShoppingLists })
        );
        listService.sharedShoppingListsListener(user, sharedShoppingLists =>
          this.setState({ sharedShoppingLists })
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

  render() {
    const { user, ownedShoppingLists, sharedShoppingLists } = this.state;

    const shoppingLists = mergeShoppingLists(
      ownedShoppingLists,
      sharedShoppingLists
    );

    return (
      <div className="container">
        <header>
          <AppHeader user={user} shoppingLists={shoppingLists} />
        </header>
        <main className="main row">
          <div className="col">
            {shoppingLists.length === 0 && <WelcomeJumbotron user={user} />}
            {shoppingLists.map(list => {
              return (
                <ShoppingList key={list.id} list={list} signedInUser={user} />
              );
            })}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
