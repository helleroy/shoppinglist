import React, { Component } from "react";
import { listService } from "../context";

class ShoppingListItem extends Component {
  constructor(props) {
    super(props);

    this.state = { editable: false };
  }

  updateItemRemote = item => {
    listService.updateItem(this.props.list, item);
  };

  submitItemChange = event => {
    event.preventDefault();
    const { item } = this.props;

    const formData = new FormData(event.target);
    const name = formData.get("name");

    this.setState({ editable: false });
    this.updateItemRemote({ ...item, name });
  };

  toggleItemChecked = () => {
    const { item } = this.props;
    const checked = !item.checked;
    this.updateItemRemote({ ...item, checked });
  };

  renderName = () => {
    const { item } = this.props;
    const { editable } = this.state;

    const checkedStyle = item.checked ? "border-success" : null;

    return editable ? (
      <input
        type="text"
        placeholder="Name"
        className={`form-control ${checkedStyle}`}
        name="name"
        autoFocus
        defaultValue={item.name}
      />
    ) : (
      <div
        className={`form-control ${checkedStyle} clickable`}
        onClick={this.toggleItemChecked}
      >
        {item.name}
      </div>
    );
  };

  renderEditButton = () => {
    const { editable } = this.state;

    return editable ? (
      <button type="submit" className="btn btn-info col-6">
        <i className="fas fa-check" />
      </button>
    ) : (
      <button
        type="button"
        className="btn btn-outline-info col-6"
        onClick={event => {
          event.preventDefault();
          this.setState({ editable: true });
        }}
      >
        <i className="far fa-edit" />
      </button>
    );
  };

  render() {
    const { list, item } = this.props;

    return (
      <form className="input-group" onSubmit={this.submitItemChange}>
        <div
          className="input-group-prepend col-1 p-0 clickable"
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
