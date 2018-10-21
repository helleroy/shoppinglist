import React, { Component } from "react";
import { listService } from "../context";
import ShoppingListItem from "./ShoppingListItem";
import ShoppingListHeader from "./ShoppingListHeader";

class ShoppingList extends Component {
  constructor(props) {
    super(props);

    this.state = { items: [] };
  }

  componentDidMount() {
    listService.itemListener(this.props.list, items =>
      this.setState({ items })
    );
  }

  componentWillUnmount() {
    listService.removeItemListener(this.props.list);
  }

  handleNewSharedUser = async event => {
    event.preventDefault();

    const { signedInUser } = this.props;
    const formData = new FormData(event.target);
    const email = formData.get("email");
    event.target.reset();

    if (signedInUser.email !== email) {
      await listService.addUserToList(this.props.list, email);
    }
  };

  handleNewItem = async event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    event.target.reset();
    await listService.addItemToShoppingList(this.props.list, {
      name: formData.get("name")
    });
  };

  render() {
    const { list, signedInUser } = this.props;
    const { items } = this.state;

    return (
      <div className="card">
        <header className="card-header">
          <ShoppingListHeader list={list} signedInUser={signedInUser} />
        </header>
        <main className="card-body">
          <div className="list-group">
            {items.map(item => (
              <div key={item.id} className="mb-2">
                <ShoppingListItem list={list} item={item} />
              </div>
            ))}
          </div>
          <form onSubmit={this.handleNewItem} className="form-group">
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Item name"
                className="form-control"
              />
              <div className="input-group-append col-2 p-0">
                <button type="submit" className="btn btn-primary col-12">
                  <i className="fas fa-plus" />
                </button>
              </div>
            </div>
          </form>
        </main>
        <footer className="card-footer d-flex justify-content-between">
          <form
            onSubmit={this.handleNewSharedUser}
            className="input-group col-5 p-0"
          >
            <input
              type="email"
              name="email"
              placeholder="User email"
              className="form-control"
            />
            <div className="input-group-append">
              <input
                type="submit"
                value="Share"
                className="btn btn-secondary"
              />
            </div>
          </form>
          <button
            className="btn btn-outline-danger"
            onClick={() => listService.removeShoppingList(list)}
          >
            Delete list
          </button>
        </footer>
      </div>
    );
  }
}

export default ShoppingList;
