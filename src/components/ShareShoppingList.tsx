import React, { FormEvent, useRef } from "react";
import { listService } from "../context";
import { ShoppingList, SignedInUser } from "../types";

interface Props {
  signedInUser: SignedInUser | null;
  list: ShoppingList;
}

function ShareShoppingList(props: Props) {
  const { signedInUser, list } = props;

  const emailInput = useRef<HTMLInputElement>(null);

  const handleNewSharedUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (event.target instanceof HTMLFormElement) {
      const formData = new FormData(event.target);
      const email = formData.get("email") as string;

      event.target.reset();
      if (emailInput && emailInput.current) {
        emailInput.current.blur();
      }

      if (signedInUser && signedInUser.email !== email) {
        await listService.addUserToList(list, email);
      }
    }
  };

  return (
    <form onSubmit={handleNewSharedUser} className="input-group">
      <input
        ref={emailInput}
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
  );
}

export default ShareShoppingList;
