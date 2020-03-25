import React, { FormEvent, useRef } from "react";
import { listService } from "../context";
import { SignedInUser } from "../types";

interface Props {
  user: SignedInUser;
}

function CreateShoppingList(props: Props) {
  const { user } = props;

  const listNameInput = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (event.target instanceof HTMLFormElement) {
      const formData = new FormData(event.target);
      const name = formData.get("name") as string;
      event.target.reset();

      if (listNameInput && listNameInput.current) {
        listNameInput.current.blur();
      }

      await listService.createShoppingList(user, name);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="input-group">
        <input
          ref={listNameInput}
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

export default CreateShoppingList;
