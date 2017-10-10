const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.createProfile = functions.auth.user().onCreate(event => {
  const user = event.data;
  const uid = event.uid;
  const email = user.email;
  const displayName = user.displayName || email;
  const image = user.photoURL;
  const key = admin.database().ref(`v1/`)
  // ...
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
