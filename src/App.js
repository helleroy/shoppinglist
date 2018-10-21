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

    this.state = { ownedShoppingLists: [], sharedShoppingLists: [] };
  }

  componentDidMount() {
    authenticationService.handleAuthStateChanged(async user => {
      if (user) {
        await userService.updateUser(user);
        await listService.ownedShoppingListListener(user, ownedShoppingLists =>
          this.setState({ ownedShoppingLists })
        );
        await listService.sharedShoppingListsListener(
          user,
          sharedShoppingLists => this.setState({ sharedShoppingLists })
        );
        this.setState({ user });
      } else {
        this.setState({ user: undefined });
      }
    });
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
