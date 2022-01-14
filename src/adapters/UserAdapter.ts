import {
  collection,
  doc,
  DocumentSnapshot,
  Firestore,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { SignedInUser, User } from "../types";

const collectionName = "users";

export class UserAdapter {
  _db: Firestore;

  constructor(db: Firestore) {
    this._db = db;
  }

  async updateUser(user: SignedInUser): Promise<void> {
    const { displayName, email, photoURL } = user;
    try {
      const documentReference = doc(this._db, collectionName, user.uid);
      await setDoc(documentReference, { displayName, email, photoURL });
    } catch (error) {
      console.log(error);
    }
  }

  async updateMessagingToken(
    user: SignedInUser,
    messagingToken: string
  ): Promise<void> {
    try {
      const documentReference = doc(this._db, collectionName, user.uid);
      await updateDoc(documentReference, { messagingToken });
    } catch (error) {
      console.log(error);
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const documentReference = doc(this._db, collectionName, id);
      const document = await getDoc(documentReference);

      if (!document.exists) {
        return null;
      }

      return mapUser(document);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const collectionReference = collection(this._db, collectionName);
      const dataQuery = query(collectionReference, where("email", "==", email));

      const snapshot = await getDocs(dataQuery);

      if (snapshot.empty) {
        return null;
      }

      return mapUser(snapshot.docs[0]);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

function mapUser(document: DocumentSnapshot): User | null {
  const data = document.data();
  if (data) {
    return {
      id: document.id,
      displayName: data.displayName,
      email: data.email,
      messagingToken: data.messagingToken,
      photoURL: data.photoURL,
    };
  }

  return null;
}
