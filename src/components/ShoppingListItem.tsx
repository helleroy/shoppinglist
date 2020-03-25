import React, { FormEvent, useState } from "react";
import { listService } from "../context";
import {
  ShoppingList,
  ShoppingListItem as ShoppingListItemType,
} from "../types";

interface Props {
  list: ShoppingList;
  item: ShoppingListItemType;
}

function ItemName(props: {
  item: ShoppingListItemType;
  editable: boolean;
  onClick: () => void;
}) {
  const { item, editable, onClick } = props;

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
      className={`form-control ${checkedStyle} clickable h-auto`}
      onClick={onClick}
    >
      {item.name}
    </div>
  );
}

function EditButton(props: {
  editable: boolean;
  setEditable: (editable: boolean) => void;
}) {
  const { editable, setEditable } = props;

  return editable ? (
    <button type="submit" className="btn btn-info col-6">
      <i className="fas fa-check" />
    </button>
  ) : (
    <button
      type="button"
      className="btn btn-outline-info col-6"
      onClick={(event) => {
        event.preventDefault();
        setEditable(true);
      }}
    >
      <i className="far fa-edit" />
    </button>
  );
}

function ShoppingListItem(props: Props) {
  const { list, item } = props;

  const [editable, setEditable] = useState(false);

  const submitItemChange = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { item } = props;

    if (event.target instanceof HTMLFormElement) {
      const formData = new FormData(event.target);
      const name = formData.get("name") as string;

      setEditable(false);
      listService.updateItem(props.list, { ...item, name });
    }
  };

  const toggleItemChecked = () => {
    const { item } = props;
    const checked = !item.checked;
    listService.updateItem(props.list, { ...item, checked });
  };

  return (
    <form className="input-group" onSubmit={submitItemChange}>
      <div
        className="input-group-prepend col-1 p-0 clickable"
        onClick={toggleItemChecked}
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
      <ItemName item={item} editable={editable} onClick={toggleItemChecked} />
      <div className="input-group-append col-4 p-0">
        <EditButton editable={editable} setEditable={setEditable} />
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

export default ShoppingListItem;
