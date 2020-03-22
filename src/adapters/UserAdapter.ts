import firebase from "firebase";
import { SignedInUser, User } from "../types";

export class UserAdapter {
  _db: firebase.firestore.Firestore;

  constructor(db: firebase.firestore.Firestore) {
    this._db = db;
  }

  async updateUser(user: SignedInUser): Promise<void> {
    const { displayName, email, photoURL } = user;
    try {
      await this._db
        .doc(`users/${user.uid}`)
        .set({ displayName, email, photoURL });
    } catch (error) {
      console.log(error);
    }
  }

  async updateMessagingToken(
    user: SignedInUser,
    messagingToken: string
  ): Promise<void> {
    try {
      await this._db.doc(`users/${user.uid}`).update({ messagingToken });
    } catch (error) {
      console.log(error);
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const doc = await this._db.doc(`users/${id}`).get();

      if (!doc.exists) {
        return null;
      }

      return mapUser(doc);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const snapshot = await this._db
        .collection("users")
        .where("email", "==", email)
        .get();

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

function mapUser(document: firebase.firestore.DocumentSnapshot): User | null {
  const data = document.data();
  if (data) {
    return {
      id: document.id,
      displayName: data.displayName,
      email: data.email,
      messagingToken: data.messagingToken,
      photoURL: data.photoURL
    };
  }

  return null;
}
