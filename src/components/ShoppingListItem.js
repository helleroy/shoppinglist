import React, { Component } from "react";
import { listService } from "../context";

class ShoppingListItem extends Component {
  constructor(props) {
    super(props);

    this.state = { editable: false, item: props.item };
  }

  updateItemRemote = () => {
    listService.updateItem(this.props.list, this.state.item);
  };

  submitItemChange = event => {
    event.preventDefault();
    this.setState({ editable: false });

    this.updateItemRemote();
  };

  toggleItemChecked = () => {
    const { item } = this.state;
    this.setState({ item: { ...item, checked: !item.checked } }, () => {
      this.updateItemRemote();
    });
  };

  renderName = () => {
    const { editable, item } = this.state;

    const checkedStyle = item.checked ? "border-success" : null;

    return editable ? (
      <input
        type="text"
        placeholder="Name"
        className={`form-control ${checkedStyle}`}
        value={item.name}
        autoFocus
        onChange={event =>
          this.setState({ item: { ...item, name: event.target.value } })
        }
      />
    ) : (
      <div
        className={`form-control ${checkedStyle}`}
        onClick={this.toggleItemChecked}
      >
        {item.name}
      </div>
    );
  };

  renderEditButton = () => {
    const { editable } = this.state;

    return editable ? (
      <button
        type="button"
        className="btn btn-info col-6 "
        onClick={this.submitItemChange}
      >
        <i className="fas fa-check" />
      </button>
    ) : (
      <button
        type="button"
        className="btn btn-outline-info col-6"
        onClick={() => {
          this.setState({ editable: true });
        }}
      >
        <i className="far fa-edit" />
      </button>
    );
  };

  render() {
    const { list } = this.props;
    const { item } = this.state;

    return (
      <form className="input-group" onSubmit={this.submitItemChange}>
        <div
          className="input-group-prepend col-1 p-0"
          onClick={this.toggleItemChecked}
        >
          {item.checked ? (
            <span className="input-group-text col-12 justify-content-center text-success border-success">
              <i className="fas fa-check-circle" />
            </span>
          ) : (
            <span className="input-group-text col-12 justify-content-center">
              <i className="far fa-circle" />
            </span>
          )}
        </div>
        {this.renderName()}
        <div className="input-group-append col-4 p-0">
          {this.renderEditButton()}
          <button
            type="button"
            className="btn btn-danger col-6 "
            onClick={() => listService.removeItemFromShoppingList(list, item)}
          >
            <i className="fas fa-times" />
          </button>
        </div>
      </form>
    );
  }
}

export default ShoppingListItem;
