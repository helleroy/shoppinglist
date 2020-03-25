import React from "react";
import CreateShoppingList from "./CreateShoppingList";
import { SignedInUser } from "../types";

interface Props {
  user: SignedInUser | null;
}

function WelcomeJumbotron(props: Props) {
  const { user } = props;

  return (
    <div className="jumbotron">
      <h1 className="display-4">Shopping list</h1>
      <p className="lead">
        Create shopping lists, share them with your friends and keep it all in
        sync in real-time!
      </p>
      <hr className="my-4" />
      {user ? (
        <div>
          <p className="lead">
            You do not have any lists yet. Create one or ask a friend to share
            one with you
          </p>
          <div className="col-6 p-0">
            <CreateShoppingList user={user} />
          </div>
        </div>
      ) : (
        <p className="lead">Sign in to get started</p>
      )}
    </div>
  );
}

export default WelcomeJumbotron;
