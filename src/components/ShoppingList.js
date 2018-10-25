import React, { Component } from "react";
import { listService } from "../context";
import ShoppingListItem from "./ShoppingListItem";
import ShoppingListHeader from "./ShoppingListHeader";
import DragHandle from "./DragHandle";
import ShareShoppingList from "./ShareShoppingList";

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
    listService.unsubscribeItemListener(this.props.list);
  }

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

    const canDelete = signedInUser.uid === list.owner.id;

    return (
      <div className="card mb-3">
        <header className="card-header d-flex flex-row justify-content-between">
          <ShoppingListHeader list={list} signedInUser={signedInUser} />
          <DragHandle />
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
        <footer className="card-footer py-0 pb-3">
          <div className="row justify-content-between">
            <ShareShoppingList signedInUser={signedInUser} list={list} />
            {canDelete && (
              <div className="col-sm-3 mt-3">
                <button
                  className="btn btn-outline-danger col-sm"
                  onClick={() => listService.removeShoppingList(list)}
                >
                  Delete list
                </button>
              </div>
            )}
          </div>
        </footer>
      </div>
    );
  }
}

export default ShoppingList;
