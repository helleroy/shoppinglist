import React, { FocusEvent, FormEvent, useState } from "react";
import SharedUser from "./SharedUser";
import { listService } from "../context";
import Collapsible from "react-collapsible";
import { ShoppingList, SignedInUser } from "../types";

interface Props {
  list: ShoppingList;
  signedInUser: SignedInUser;
  moveListLeft: (() => void) | null;
  moveListRight: (() => void) | null;
}

function handleNameBlur(
  event: FocusEvent<HTMLFormElement>,
  list: ShoppingList
) {
  event.preventDefault();

  const formData = new FormData(event.target.form);
  const name = formData.get("name") as string;

  listService.updateListName(list, name);
}

function handleNameFormSubmit(
  event: FormEvent<HTMLFormElement>,
  list: ShoppingList
) {
  event.preventDefault();

  if (event.target instanceof HTMLFormElement) {
    const formData = new FormData(event.target);
    const name = formData.get("name") as string;

    listService.updateListName(list, name);
  }
}

function ShoppingListHeader(props: Props) {
  const { list, signedInUser, moveListLeft, moveListRight } = props;

  const [editingListName, setEditingListName] = useState(false);
  const [showListDetails, setShowListDetails] = useState(false);

  return (
    <div className="row justify-content-between">
      <div className="col-10">
        <div>
          <form
            onSubmit={(event) => {
              setEditingListName(false);
              handleNameFormSubmit(event, list);
            }}
            onBlur={(event) => {
              setEditingListName(false);
              handleNameBlur(event, list);
            }}
            className="d-flex align-items-center"
          >
            {editingListName ? (
              <input
                type="text"
                name="name"
                defaultValue={list.name}
                autoFocus
                className="display-4 discreet-input list-header-text"
                autoComplete="off"
              />
            ) : (
              <h2
                className="display-4 clickable list-header-text"
                onClick={() => setEditingListName(true)}
              >
                {list.name}
              </h2>
            )}
          </form>
        </div>
        <Collapsible
          trigger=""
          open={showListDetails}
          easing="cubic-bezier(0.68, -0.55, 0.265, 1.55)"
        >
          {list.owner && (
            <h4 className="lead d-inline-flex align-items-center">
              Created by
              <img
                src={list.owner.photoURL}
                alt={`${list.owner.displayName}`}
                className="profile-image-sm mx-2"
              />
              {list.owner.displayName}
            </h4>
          )}
          {list.sharedWith.length > 0 && (
            <div>
              <h4 className="lead m-0">Shared with</h4>
              <div className="d-flex flex-wrap justify-content-start">
                {list.sharedWith.map((sharedUser) => (
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
      <div className="d-flex flex-column col-2 justify-content-between align-items-center">
        <div className="d-flex flex-row justify-content-center">
          <button
            type="button"
            className={`button-transparent ${
              !moveListLeft && "list-sort-disabled"
            }`}
            onClick={moveListLeft || (() => {})}
          >
            <i className="fas fa-chevron-left" />
          </button>
          <button
            type="button"
            className={`button-transparent ${
              !moveListRight && "list-sort-disabled"
            }`}
            onClick={moveListRight || (() => {})}
          >
            <i className="fas fa-chevron-right" />
          </button>
        </div>
        <button
          type="button"
          className={`list-details-toggle button-transparent ${
            showListDetails && "rotate-180"
          }`}
          onClick={() => setShowListDetails(!showListDetails)}
        >
          <i className="fas fa-chevron-circle-down" />
        </button>
      </div>
    </div>
  );
}

export default ShoppingListHeader;
