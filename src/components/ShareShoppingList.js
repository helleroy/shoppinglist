import React, { Component } from "react";
import { listService } from "../context";

class ShareShoppingList extends Component {
  _emailInputRef;

  constructor() {
    super();

    this._emailInputRef = React.createRef();
  }

  handleNewSharedUser = async event => {
    event.preventDefault();

    const { signedInUser } = this.props;
    const formData = new FormData(event.target);
    const email = formData.get("email");

    event.target.reset();
    this._emailInputRef.current.blur();

    if (signedInUser.email !== email) {
      await listService.addUserToList(this.props.list, email);
    }
  };

  render() {
    return (
      <div className="col-sm-6 mt-3">
        <form onSubmit={this.handleNewSharedUser} className="input-group">
          <input
            ref={this._emailInputRef}
            type="email"
            name="email"
            placeholder="User email"
            className="form-control"
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-secondary">
              Share
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ShareShoppingList;
