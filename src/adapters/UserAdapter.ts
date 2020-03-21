import { docWithId } from "../utils/firebase";
import { SignedInUser } from "../types";

export class UserAdapter {
  _db: firebase.firestore.Firestore;

  constructor(db: firebase.firestore.Firestore) {
    this._db = db;
  }

  async updateUser(user: SignedInUser) {
    const { displayName, email, photoURL } = user;
    try {
      return this._db
        .doc(`users/${user.uid}`)
        .set({ displayName, email, photoURL });
    } catch (error) {
      console.log(error);
    }
  }

  async updateMessagingToken(user: SignedInUser, messagingToken: string) {
    try {
      return this._db.doc(`users/${user.uid}`).update({ messagingToken });
    } catch (error) {
      console.log(error);
    }
  }

  async getUserById(id: string) {
    try {
      const doc = await this._db.doc(`users/${id}`).get();

      if (!doc.exists) {
        return null;
      }

      return docWithId(doc);
    } catch (error) {
      console.log(error);
    }
  }

  async getUserByEmail(email: string) {
    try {
      const snapshot = await this._db
        .collection("users")
        .where("email", "==", email)
        .get();

      if (snapshot.empty) {
        return null;
      }

      return docWithId(snapshot.docs[0]);
    } catch (error) {
      console.log(error);
    }
  }
}
