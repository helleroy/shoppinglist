import React, { Component } from "react";
import { listService } from "../context";

class CreateShoppingList extends Component {
  handleSubmit = async event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get("name");
    event.target.reset();

    await listService.createShoppingList(this.props.user, name);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="input-group">
          <input
            type="text"
            placeholder="List name"
            className="form-control"
            name="name"
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
