import React, { Component } from "react";
import "./App.css";
import ShoppingList from "./components/ShoppingList";
import { authenticationService, listService, userService } from "./context";
import WelcomeJumbotron from "./components/WelcomeJumbotron";
import AppHeader from "./components/AppHeader";

class App extends Component {
  constructor() {
    super();

    this.state = { shoppingLists: [] };
  }

  componentDidMount() {
    authenticationService.handleAuthStateChanged(async user => {
      if (user) {
        await userService.updateUser(user);
        await listService.shoppingListListener(user, shoppingLists =>
          this.setState({ user, shoppingLists })
        );
        this.setState({ user });
      } else {
        this.setState({ user: undefined });
      }
    });
  }

  render() {
    const { user, shoppingLists } = this.state;

    return (
      <div className="container">
        <header>
          <AppHeader user={user} shoppingLists={shoppingLists} />
        </header>
        <main className="main row">
          <div className="col">
            {shoppingLists.length === 0 && <WelcomeJumbotron user={user} />}
            {shoppingLists.map(list => {
              return <ShoppingList key={list.id} list={list} />;
            })}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
