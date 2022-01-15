import React, {
  FormEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { listService } from "../context";
import ShoppingListItem from "./ShoppingListItem";
import ShoppingListHeader from "./ShoppingListHeader";
import ShareShoppingList from "./ShareShoppingList";
import {
  ShoppingList as ShoppingListType,
  ShoppingListItem as ShoppingListItemType,
  SignedInUser,
} from "../types";

interface Props {
  list: ShoppingListType;
  signedInUser: SignedInUser;
  moveListLeft: ((ref: RefObject<HTMLElement>) => void) | null;
  moveListRight: ((ref: RefObject<HTMLElement>) => void) | null;
}

async function addNewItem(
  event: FormEvent<HTMLFormElement>,
  list: ShoppingListType
) {
  event.preventDefault();

  if (event.target instanceof HTMLFormElement) {
    const formData = new FormData(event.target);
    event.target.reset();
    await listService.addItemToShoppingList(
      list,
      formData.get("name") as string
    );
  }
}

function ShoppingList(props: Props) {
  const { list, signedInUser, moveListLeft, moveListRight } = props;

  const [items, setItems] = useState<Array<ShoppingListItemType>>([]);
  const [listComplete, setListComplete] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listService.itemListener(list, setItems);

    return () => {
      listService.unsubscribeItemListener(list);
    };
  }, [list]);

  useEffect(() => {
    const listComplete = items.reduce((previous, current) => {
      return previous && current.checked;
    }, true);

    setListComplete(listComplete && items.length !== 0);
  }, [items]);

  const canDelete = list.owner && signedInUser.uid === list.owner.id;

  const moveLeft = moveListLeft
    ? () => {
        moveListLeft(ref);
      }
    : null;
  const moveRight = moveListRight
    ? () => {
        moveListRight(ref);
      }
    : null;

  return (
    <div className="snap-scrollable-item" ref={ref}>
      <header className="card-header">
        <ShoppingListHeader
          list={list}
          signedInUser={signedInUser}
          moveListLeft={moveLeft}
          moveListRight={moveRight}
        />
      </header>
      <main className="card-body">
        <div className="list-group">
          {items.map((item) => (
            <div key={item.id} className="mb-2">
              <ShoppingListItem list={list} item={item} />
            </div>
          ))}
        </div>
        <form
          onSubmit={(event) => addNewItem(event, list)}
          className="form-group"
        >
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Item name"
              className="form-control"
            />
            <div className="input-group-append col-2 p-0">
              <button type="submit" className="btn btn-primary col-12">
                <i className="fas fa-plus" />
              </button>
            </div>
          </div>
        </form>
        {listComplete && (
          <div className="mt-3">
            <button
              className="btn btn-outline-danger col-sm"
              onClick={() => listService.clearShoppingList(list)}
            >
              Clear list
            </button>
          </div>
        )}
      </main>
      <footer className="card py-0 border-0">
        <div className="card-body row justify-content-between py-0">
          <ShareShoppingList signedInUser={signedInUser} list={list} />
          {canDelete && (
            <div className="col-sm-3 mt-3">
              <button
                className="btn btn-outline-danger col-sm"
                onClick={() => listService.removeShoppingList(list)}
              >
                Delete list
              </button>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}

export default ShoppingList;
