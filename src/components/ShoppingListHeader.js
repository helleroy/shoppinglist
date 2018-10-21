import React, { Component } from "react";
import SharedUser from "./SharedUser";
import { listService } from "../context";

class ShoppingListHeader extends Component {
  constructor(props) {
    super(props);

    this.state = { editingListName: false };
  }

  submitListName = form => {
    this.setState({ editingListName: false });

    const formData = new FormData(form);
    const name = formData.get("name");

    listService.updateListName(this.props.list, name);
  };

  handleNameBlur = event => {
    event.preventDefault();
    this.submitListName(event.target.form);
  };

  handleNameFormSubmit = event => {
    event.preventDefault();
    this.submitListName(event.target);
  };

  render() {
    const { list, signedInUser } = this.props;
    const { editingListName } = this.state;

    return (
      <div>
        <div>
          <form
            onSubmit={this.handleNameFormSubmit}
            onBlur={this.handleNameBlur}
            className="d-flex align-items-center"
          >
            {editingListName ? (
              <input
                type="text"
                name="name"
                defaultValue={list.name}
                autoFocus
                className="display-4 discreet-input"
                autoComplete="off"
              />
            ) : (
              <h2
                className="display-4 clickable"
                onClick={() => this.setState({ editingListName: true })}
              >
                {list.name}
              </h2>
            )}
          </form>
          <h4 className="lead d-inline-flex align-items-center">
            Created by
            <img
              src={list.owner.photoURL}
              alt={`${list.owner.displayName}`}
              className="profile-image-sm mx-2"
            />
            {list.owner.displayName}
          </h4>
        </div>
        <div>
          {list.sharedWith.length > 0 && (
            <div>
              <h4 className="lead m-0">Shared with</h4>
              <div className="d-flex flex-wrap justify-content-start">
                {list.sharedWith.map(sharedUser => (
                  <div key={sharedUser.id} className="mt-2 mr-2">
                    <SharedUser
                      sharedUser={sharedUser}
                      signedInUser={signedInUser}
                      list={list}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ShoppingListHeader;
