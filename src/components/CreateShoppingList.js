import React, { Component } from "react";
import { listService } from "../context";

class CreateShoppingList extends Component {
  _listNameInputRef;

  constructor() {
    super();

    this._listNameInputRef = React.createRef();
  }

  handleSubmit = async event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get("name");
    event.target.reset();
    this._listNameInputRef.current.blur();

    await listService.createShoppingList(this.props.user, name);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="input-group">
          <input
            ref={this._listNameInputRef}
            type="text"
            placeholder="List name"
            className="form-control"
            name="name"
            autoComplete="off"
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-plus" />
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateShoppingList;
