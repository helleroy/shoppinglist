const admin = require("firebase-admin");
const functions = require("firebase-functions");
const _ = require("lodash");

const app = admin.initializeApp();
const firestore = app.firestore();
firestore.settings({ timestampsInSnapshots: true });
const messaging = app.messaging();

async function getUserById(id) {
  try {
    const doc = await firestore.doc(`users/${id}`).get();

    if (!doc.exists) {
      return null;
    }

    return doc.data();
  } catch (error) {
    console.log(error);
  }
}

exports.sharedWithNotification = functions.firestore
  .document("shoppinglists/{shoppingListId}")
  .onUpdate(async change => {
    const afterDocument = change.after.data();

    const sharedWithBefore = change.before.data().sharedWith;
    const sharedWithAfter = afterDocument.sharedWith;

    if (_.isEqual(sharedWithBefore, sharedWithAfter)) {
      return console.log("No change in sharedWith");
    }

    const newUsersSharedWith = _.difference(sharedWithAfter, sharedWithBefore);

    if (newUsersSharedWith.length === 0) {
      return console.log("No users to send notifications to");
    }

    const messagePayload = {
      data: {
        title: `${afterDocument.name} was shared with you`,
        body: `Someone shared the ${afterDocument.name} list with you`
      }
    };

    const users = await Promise.all(
      newUsersSharedWith.map(id => getUserById(id)).filter(user => !!user)
    );

    const messagingTokens = users.map(user => user.messagingToken);

    await messaging.sendToDevice(messagingTokens, messagePayload);
  });
