import React, { Component } from "react";
import { listService } from "../context";

class CreateShoppingList extends Component {
  handleSubmit = async event => {
    event.preventDefault();

    const formData = new FormData(event.target);

    await listService.createShoppingList(this.props.user, formData.get("name"));
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
