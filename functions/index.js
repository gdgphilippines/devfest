const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.createProfile = functions.auth.user().onCreate(event => {
  const user = event.data;
  const email = user.email;
  const displayName = user.displayName || email;
  const uid = user.uid;
  const image = user.photoURL;
  const updates = {};
  const path = `v1/user/source/${uid}`;
  updates[`${path}/primary/email`] = email;
  updates[`${path}/primary/displayName`] = displayName;
  updates[`${path}/primary/image`] = image;
  updates[`${path}/primary/ticketNumber`] = '';
  updates[`${path}/primary/ticketEmail`] = '';
  updates[`${path}/primary/ticketName`] = '';
  updates[`${path}/meta/accepted`] = false;
  updates[`${path}/meta/score`] = 0;
  updates[`${path}/meta/verified`] = false;
  updates[`${path}/meta/dateJoined`] = admin.database.ServerValue.TIMESTAMP;
  // updates[`${path}/cross/ticketEmail`] = '';
  admin.database().ref().update(updates);
  // ...
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
