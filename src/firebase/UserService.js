import firebase from "firebase/app";
import "firebase/firestore";
import { docWithId } from "../utils/firebase";

export class UserService {
  _db;

  constructor(firebaseApp) {
    this._db = firebase.firestore(firebaseApp);
    this._db.settings({
      timestampsInSnapshots: true
    });
  }

  async updateUser(user) {
    const { displayName, email, photoURL } = user;
    try {
      return this._db
        .doc(`users/${user.uid}`)
        .set({ displayName, email, photoURL });
    } catch (error) {
      console.log(error);
    }
  }

  async getUserById(id) {
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

  async getUserByEmail(email) {
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
