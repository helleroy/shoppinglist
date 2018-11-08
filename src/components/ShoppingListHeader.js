import React, { Component } from "react";
import SharedUser from "./SharedUser";
import { listService } from "../context";
import DragHandle from "./DragHandle";
import Collapsible from "react-collapsible";

class ShoppingListHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editingListName: false,
      showListDetails: false
    };
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

  toggleListDetails = () => {
    this.setState({ showListDetails: !this.state.showListDetails });
  };

  render() {
    const { list, signedInUser } = this.props;
    const { editingListName } = this.state;

    return (
      <div className="row justify-content-between">
        <div className="col-10">
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
          </div>
          <Collapsible
            open={this.state.showListDetails}
            easing="cubic-bezier(0.68, -0.55, 0.265, 1.55)"
          >
            <h4 className="lead d-inline-flex align-items-center">
              Created by
              <img
                src={list.owner.photoURL}
                alt={`${list.owner.displayName}`}
                className="profile-image-sm mx-2"
              />
              {list.owner.displayName}
            </h4>
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
          </Collapsible>
        </div>
        <div className="d-flex flex-column col-1 justify-content-between">
          <div className="d-flex justify-content-end pr-1">
            <DragHandle />
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className={`list-details-toggle ${this.state.showListDetails &&
                "rotate-180"}`}
              onClick={this.toggleListDetails}
            >
              <i className="fas fa-arrow-down" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ShoppingListHeader;
