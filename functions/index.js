const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

if (fs.existsSync(path.resolve(__dirname, './firebase-config.json'))) {
  console.log('hello')
  var serviceAccount = require('./firebase-config.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://devfestph.firebaseio.com'
  });
} else {
  admin.initializeApp(functions.config().firebase);
}

let eventbrite = null;
let event = null;

if (fs.existsSync(path.resolve(__dirname, './eventbrite.json'))) {
  eventbrite = JSON.parse(fs.readFileSync(path.resolve(__dirname, './eventbrite.json'), 'utf8')).key;
  event = JSON.parse(fs.readFileSync(path.resolve(__dirname, './eventbrite.json'), 'utf8')).event;
}

eventbrite = eventbrite || process.env.EVENTBRITE;
event = event || process.env.EVENT;

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

exports.connect = functions.https.onRequest((req, res) => {
  if (!req.body.token) {
    return res
      .status(404)
      .json({
        success: false,
        message: 'No auth or uid found'
      });
  }

  if (!req.body.id) {
    return res
      .status(404)
      .json({
        success: false,
        message: 'No ticket Id found'
      });
  }

  const updates = {};
  const promises = [];

  promises.push(
    admin.auth().verifyIdToken(req.body.token)
  );

  promises.push(
    fetch(`https://www.eventbriteapi.com/v3/events/${event}/attendees/${req.body.id.substring(9, 18)}/?token=${eventbrite}`)
      .then(result => {
        return result.json();
      })
  );

  Promise.all(promises)
    .then(results => {
      const user = results[0];
      const json = results[1];

      if (json.status_code === 400) {
        return Promise.reject(json);
      }

      if (!json.profile) {
        return Promise.reject(json);
      }

      if (!user) {
        return Promise.reject(new Error('No user'));
      }

      updates[`v1/user/source/${user.uid}/primary/ticketEmail`] = json.profile.email;
      updates[`v1/user/source/${user.uid}/primary/ticketName`] = json.profile.first_name + ' ' + json.profile.last_name;
      updates[`v1/user/source/${user.uid}/primary/ticketNumber`] = req.body.id;

      return admin
        .database()
        .ref()
        .update(updates);
    })
    .then(() => {
      res
        .status(200)
        .json({
          success: true
        });
    })
    .catch(error => {
      return res
        .status(error.status_code || 500)
        .json(error);
    });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
