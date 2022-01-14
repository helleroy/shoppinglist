import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  onSnapshot,
  query,
  QueryDocumentSnapshot,
  Unsubscribe,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import {
  BaseShoppingList,
  ShoppingList,
  ShoppingListItem,
  SignedInUser,
  User,
} from "../types";

const collectionName = "shoppinglists";

export class ShoppingListAdapter {
  _db: Firestore;

  constructor(db: Firestore) {
    this._db = db;
  }

  async createShoppingList(user: SignedInUser, name: string): Promise<void> {
    try {
      const collectionReference = await collection(this._db, collectionName);
      await addDoc(collectionReference, {
        owner: user.uid,
        name,
        sharedWith: [],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async removeShoppingList(shoppingList: ShoppingList): Promise<void> {
    try {
      const documentReference = doc(this._db, collectionName, shoppingList.id);
      await deleteDoc(documentReference);
    } catch (error) {
      console.log(error);
    }
  }

  async removeAllItemsFromShoppingList(
    shoppingList: ShoppingList
  ): Promise<void> {
    try {
      const collectionReference = collection(
        this._db,
        collectionName,
        shoppingList.id,
        "items"
      );
      const docs = await getDocs(collectionReference);

      const batch = writeBatch(this._db);
      docs.forEach((doc) => batch.delete(doc.ref));
      await batch.commit();
    } catch (error) {
      console.log(error);
    }
  }

  async addItemToShoppingList(
    shoppingList: ShoppingList,
    itemName: string
  ): Promise<void> {
    try {
      const collectionReference = collection(
        this._db,
        collectionName,
        shoppingList.id,
        "items"
      );
      await addDoc(collectionReference, { name: itemName, checked: false });
    } catch (error) {
      console.log(error);
    }
  }

  async removeItemFromShoppingList(
    shoppingList: ShoppingList,
    item: ShoppingListItem
  ): Promise<void> {
    try {
      const documentReference = doc(
        this._db,
        collectionName,
        shoppingList.id,
        "items",
        item.id
      );
      await deleteDoc(documentReference);
    } catch (error) {
      console.log(error);
    }
  }

  async updateListName(
    shoppingList: ShoppingList,
    name: string
  ): Promise<void> {
    try {
      const documentReference = doc(this._db, collectionName, shoppingList.id);
      await updateDoc(documentReference, { name });
    } catch (error) {
      console.log(error);
    }
  }

  async updateSharedWith(
    shoppingList: ShoppingList,
    users: Array<User>
  ): Promise<void> {
    try {
      const userIds = users.map((u) => u.id);
      const documentReference = doc(this._db, collectionName, shoppingList.id);
      await updateDoc(documentReference, { sharedWith: userIds });
    } catch (error) {
      console.log(error);
    }
  }

  async updateItem(
    shoppingList: ShoppingList,
    item: ShoppingListItem
  ): Promise<void> {
    try {
      const documentReference = doc(
        this._db,
        collectionName,
        shoppingList.id,
        "items",
        item.id
      );
      await updateDoc(documentReference, {
        name: item.name,
        checked: item.checked,
      });
    } catch (error) {
      console.log(error);
    }
  }

  ownedShoppingListListener(
    user: SignedInUser,
    callback: (shoppingLists: Array<BaseShoppingList>) => void
  ): Unsubscribe | undefined {
    try {
      const collectionReference = collection(this._db, collectionName);
      const dataQuery = query(
        collectionReference,
        where("owner", "==", user.uid)
      );

      return onSnapshot(dataQuery, (snapshot) => {
        const shoppingLists = snapshot.docs.map(mapShoppingList);
        callback(shoppingLists);
      });
    } catch (error) {
      console.log(error);
    }
  }

  sharedShoppingListsListener(
    user: SignedInUser,
    callback: (shoppingLists: Array<BaseShoppingList>) => void
  ): Unsubscribe | undefined {
    try {
      const collectionReference = collection(this._db, collectionName);
      const dataQuery = query(
        collectionReference,
        where("sharedWith", "array-contains", user.uid)
      );

      return onSnapshot(dataQuery, (snapshot) => {
        const shoppingLists = snapshot.docs.map(mapShoppingList);
        callback(shoppingLists);
      });
    } catch (error) {
      console.log(error);
    }
  }

  itemListener(
    shoppingList: ShoppingList,
    callback: (items: Array<ShoppingListItem>) => void
  ): Unsubscribe | undefined {
    try {
      const collectionReference = collection(
        this._db,
        collectionName,
        shoppingList.id,
        "items"
      );

      return onSnapshot(collectionReference, (snapshot) => {
        const items = snapshot.docs.map(mapShoppingListItem);
        callback(items);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

function mapShoppingList(document: QueryDocumentSnapshot): BaseShoppingList {
  return {
    id: document.id,
    name: document.data().name,
    owner: document.data().owner,
    sharedWith: document.data().sharedWith,
  };
}

function mapShoppingListItem(
  document: QueryDocumentSnapshot
): ShoppingListItem {
  return {
    id: document.id,
    name: document.data().name,
    checked: document.data().checked,
  };
}
