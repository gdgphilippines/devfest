const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
var Chance = require('chance');

// Instantiate Chance so it can be used
var chance = new Chance();

if (fs.existsSync(path.resolve(__dirname, './firebase-config.json'))) {
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

exports.updateScore = functions.database.ref('v1/user/source/{userId}/cross/codelabs')
  .onWrite(event => {
    var score = 0;
    var updates = {};
    if (!event.data.exists()) {
      event.data.previous.forEach(child => {
        updates[`v1/codelabs/source/${child.key}/cross/scores/${event.params.userId}/value`] = score;
        updates[`v1/codelabtype/source/${child.val().type}/cross/scores/${event.params.userId}/value`] = score;
      });
      updates[`v1/user/source/${event.params.userId}/meta/score`] = score;
      updates[`v1/user/query/score/${event.params.userId}/value`] = score;
    } else {
      event.data.forEach(child => {
        updates[`v1/codelabs/source/${child.key}/cross/scores/${event.params.userId}/value`] = child.val().value;
        if (updates[`v1/codelabtype/source/${child.val().type}/cross/scores/${event.params.userId}/value`]) {
          updates[`v1/codelabtype/source/${child.val().type}/cross/scores/${event.params.userId}/value`] += child.val().value;
        } else {
          updates[`v1/codelabtype/source/${child.val().type}/cross/scores/${event.params.userId}/value`] = child.val().value;
        }
        score = score + child.val().value;
      });
      updates[`v1/user/source/${event.params.userId}/meta/score`] = score;
      updates[`v1/user/query/score/${event.params.userId}/value`] = score;
    }


    return admin.database().ref().update(updates);
  });

exports.validate = functions.https.onRequest((req, res) => {
  if (!req.body.token) {
    return res
      .status(404)
      .json({
        success: false,
        message: 'No auth or uid found'
      });
  }

  if (!req.body.validate) {
    return res
      .status(404)
      .json({
        success: false,
        message: 'No verification code found'
      });
  }

  if (!req.body.company) {
    return res
      .status(404)
      .json({
        success: false,
        message: 'No company ID found'
      });
  }

  const updates = {};
  const promises = [];

  promises.push(
    admin.auth().verifyIdToken(req.body.token)
  );

  promises.push(
    admin.database().ref(`v1/sponsors/source/${req.body.company}/meta/code`)
    .once('value')
  );

  Promise.all(promises)
    .then(results => {
      const user = results[0];
      const sponsor = results[1];

      if (!sponsor.exists()) {
        var error3 = {
          status_code: 404,
          message: 'No Sponsor found for the given company ID'
        };
        return Promise.reject(error3);
      }

      if (!user) {
        var error2 = {
          status_code: 404,
          message: 'No User found'
        };
        return Promise.reject(error2);
      }

      if (sponsor.val() !== req.body.validate) {
        var error4 = {
          status_code: 404,
          message: 'Invalidate code given'
        };
        return Promise.reject(error4);
      }

      updates[`v1/sponsors/source/${req.body.company}/cross/sponsorUsers/${user.uid}/value`] = true;
      updates[`v1/user/source/${user.uid}/cross/sponsorId`] = req.body.company;

      return admin.database().ref().update(updates);
    })
    .then(() => {
      res
        .status(200)
        .json({
          success: true
        });
    })
    .catch(error => {
      console.log(error);
      return res
        .status(error.status_code || 500)
        .json(error);
    });
});

exports.scanId = functions.https.onRequest((req, res) => {
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

  if (!req.body.company) {
    return res
      .status(404)
      .json({
        success: false,
        message: 'No company Id found'
      });
  }

  const updates = {};
  const promises = [];

  promises.push(
    admin.auth().verifyIdToken(req.body.token)
  );

  promises.push(
    admin.database().ref(`v1/eventbrite/source/${req.body.id}`).once('value')
  );

  promises.push(
    admin.database().ref(`v1/sponsors/source/${req.body.company}/cross/sponsorUsers/`)
    .once('value')
  );

  Promise.all(promises)
    .then(results => {
      var user = results[0];
      var eventbrite = results[1];
      var sponsor = results[2];

      if (!sponsor.exists()) {
        var error3 = {
          status_code: 404,
          message: 'No Sponsor found for the given company ID'
        };
        return Promise.reject(error3);
      }

      if (!user) {
        var error2 = {
          status_code: 404,
          message: 'No User found'
        };
        return Promise.reject(error2);
      }

      if (!sponsor.val()[user.uid].value) {
        var error5 = {
          status_code: 403,
          message: 'Your user is not connected to this sponsor'
        };
        return Promise.reject(error5);
      }

      if (!eventbrite.exists()) {
        var error = {
          status_code: 403,
          message: `This ticket is not connected to an account or the attendee hasn't accepted the terms and conditions :(`
        };
        return Promise.reject(error);
      }

      return Promise.all([
        Promise.resolve(eventbrite),
        Promise.resolve(sponsor),
        Promise.resolve(user),
        admin.database().ref(`v1/user/source/${eventbrite.val().primary.uid}`).once('value')
      ]);
    })
    .then(results => {
      // var eventbrite = results[0];
      // var sponsor = results[1];
      var user = results[2];
      var attendee = results[3];

      if (attendee.val().primary.ticketNumber.substring(9, 18) !== req.body.id.substring(9, 18)) {
        var error = {
          status_code: 403,
          message: `This ticket is not connected to the scanned id :(`
        };
        return Promise.reject(error);
      }

      if (!attendee.val().meta.accepted) {
        var error2 = {
          status_code: 403,
          message: `Attendee hasn't accepted the Terms and Conditions. :( `
        };
        return Promise.reject(error2);
      }

      updates[`v1/sponsors/source/${req.body.company}/cross/scanned/${attendee.key}/dateScanned`] = admin.database.ServerValue.TIMESTAMP;
      updates[`v1/sponsors/source/${req.body.company}/cross/scanned/${attendee.key}/email`] = attendee.val().primary.email;
      updates[`v1/sponsors/source/${req.body.company}/cross/scanned/${attendee.key}/ticketEmail`] = attendee.val().primary.ticketEmail;
      updates[`v1/sponsors/source/${req.body.company}/cross/scanned/${attendee.key}/ticketName`] = attendee.val().primary.ticketName;
      updates[`v1/sponsors/source/${req.body.company}/cross/scanned/${attendee.key}/displayName`] = attendee.val().primary.displayName;
      updates[`v1/sponsors/source/${req.body.company}/cross/scanned/${attendee.key}/scannedByUid`] = user.uid;
      updates[`v1/sponsors/source/${req.body.company}/cross/scanned/${attendee.key}/scannedBy`] = user.name || user.displayName || user.email;
      updates[`v1/sponsors/source/${req.body.company}/cross/scanned/${attendee.key}/scannedByEmail`] = user.email;
      updates[`v1/user/source/${attendee.key}/cross/scanned/${req.body.company}/value`] = admin.database.ServerValue.TIMESTAMP;

      return admin.database().ref().update(updates);
    })
    .then(() => {
      res
        .status(200)
        .json({
          success: true
        });
    })
    .catch(error => {
      console.log(error);
      return res
        .status(error.status_code || 500)
        .json(error);
    });
});

exports.submitRepo = functions.https.onRequest((req, res) => {
  if (!req.body.token) {
    return res
      .status(404)
      .json({
        success: false,
        message: 'No auth or uid found'
      });
  }

  if (!req.body.repo) {
    return res
      .status(404)
      .json({
        success: false,
        message: 'No repository found'
      });
  }

  if (!req.body.codelabId) {
    return res
      .status(404)
      .json({
        success: false,
        message: 'No codelabId found'
      });
  }

  const github = 'https://raw.githubusercontent.com';
  const updates = {};
  const promises = [];

  admin.auth().verifyIdToken(req.body.token)
    .then(user => {
      if (!user) {
        var error2 = {
          status_code: 404,
          message: 'No User found'
        };
        return Promise.reject(error2);
      }

      promises.push(
        Promise.resolve(user)
      );

      promises.push(
        admin.database().ref(`v1/user/source/${user.uid}/primary/githubName`).once('value')
      );

      promises.push(
        admin.database().ref(`v1/user/source/${user.uid}/meta/accepted`).once('value')
      );

      promises.push(
        admin.database().ref(`v1/codelabChecker/source/${req.body.codelabId}/primary/files`).once('value')
      );

      promises.push(
        admin.database().ref(`v1/codelabs/source/${req.body.codelabId}/meta/type`).once('value')
      );

      return Promise.all(promises);
    })
    .then(results => {
      var user = results[0];
      var githubName = results[1].val();
      var accepted = results[2].val();
      var codelab = results[3];
      var typeSnapshot = results[4];
      var newPromises = [];

      var multiplier = accepted ? 2 : 1;

      if (!githubName) {
        var error2 = {
          status_code: 404,
          message: 'No Github account found'
        };
        return Promise.reject(error2);
      }

      if (!codelab.exists()) {
        var error3 = {
          status_code: 404,
          message: 'No codelab id found'
        };
        return Promise.reject(error3);
      }

      if (!typeSnapshot.exists()) {
        var error4 = {
          status_code: 404,
          message: 'No codelab type found'
        };
        return Promise.reject(error4);
      }

      newPromises.push(Promise.resolve(user));
      newPromises.push(Promise.resolve(multiplier));
      var list = [];
      codelab.forEach(child => {
        list.push(child.val());
      });

      const index = chance.integer({min: 0, max: list.length - 1});
      newPromises.push(Promise.resolve(list[index].strings));
      console.log(`${github}/${githubName}/${req.body.repo}/master${list[index].filename}`);
      newPromises.push(fetch(`${github}/${githubName}/${req.body.repo}/master${list[index].filename}`).then(response => response.text()));
      newPromises.push(Promise.resolve(typeSnapshot.val()));

      return Promise.all(newPromises);
    })
    .then(results => {
      var user = results[0];
      var multiplier = results[1];
      var strings = results[2];
      var string = results[3];
      var type = results[4];
      var score = 0;

      if (string.indexOf('404: Not Found') < 0) {
        score = 5 * multiplier;
      }

      if (strings && strings.length) {
        for (var i in strings) {
          // console.log(strings[i], string.indexOf(strings[i]))
          if (string.indexOf(strings[i]) >= 0) {
            score = score + (multiplier * 1);
          }
        }
      }

      updates[`v1/user/source/${user.uid}/cross/codelabs/${req.body.codelabId}/value`] = score;
      updates[`v1/user/source/${user.uid}/cross/codelabs/${req.body.codelabId}/type`] = type;

      return admin.database().ref().update(updates);
      // console.log(score);

      // return Promise.resolve();
    })
    .then(() => {
      res
        .status(200)
        .json({
          success: true
        });
    })
    .catch(error => {
      console.log(error);
      return res
        .status(error.status_code || 500)
        .json(error);
    });
  // https://raw.githubusercontent.com/
});

exports.scannedList = functions.https.onRequest((req, res) => {
  if (!req.body.token) {
    return res
      .status(404)
      .json({
        success: false,
        message: 'No auth or uid found'
      });
  }

  if (!req.body.company) {
    return res
      .status(404)
      .json({
        success: false,
        message: 'No repository found'
      });
  }

  const promises = [];

  promises.push(
    admin.auth().verifyIdToken(req.body.token)
  );

  promises.push(
    admin.database().ref(`v1/sponsors/source/${req.body.company}/cross/sponsorUsers/`)
    .once('value')
  );

  promises.push(
    admin.database().ref(`v1/sponsors/source/${req.body.company}/cross/scanned/`)
    .once('value')
  );

  Promise.all(promises)
    .then(results => {
      var user = results[0];
      var sponsor = results[1];
      var scanned = results[2];
      var list = [];

      if (!user) {
        var error2 = {
          status_code: 404,
          message: 'No User found'
        };
        return Promise.reject(error2);
      }

      if (!sponsor.exists()) {
        var error3 = {
          status_code: 404,
          message: 'No Sponsor found for the given company ID'
        };
        return Promise.reject(error3);
      }

      if (!sponsor.val()[user.uid].value) {
        var error5 = {
          status_code: 403,
          message: 'Your user is not connected to this sponsor'
        };
        return Promise.reject(error5);
      }

      scanned.forEach(child => {
        list.push({
          $key: child.key,
          displayName: child.val().displayName,
          email: child.val().email,
          scannedBy: child.val().scannedBy,
          dateScanned: child.val().dateScanned
        });
      });

      list.sort((a, b) => {
        return a.dateScanned - b.dateScanned;
      });

      return res
        .status(200)
        .json({
          success: true,
          list
        });
    })
    .catch(error => {
      console.log(error);
      return res
        .status(error.status_code || 500)
        .json(error);
    });
});

exports.disconnect = functions.https.onRequest((req, res) => {
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
    admin.database().ref(`v1/sponsors/query/sponsors`).once('value')
  );

  Promise.all(promises)
    .then(results => {
      var user = results[0];
      var sponsors = results[1];

      if (!user) {
        var error2 = {
          status_code: 404,
          message: 'No User found'
        };
        return Promise.reject(error2);
      }

      sponsors.forEach(child => {
        updates[`v1/sponsors/source/${child.key}/cross/scanned/${user.uid}`] = null;
      });

      updates[`v1/user/source/${user.uid}/primary/ticketEmail`] = '';
      updates[`v1/user/source/${user.uid}/primary/ticketName`] = '';
      updates[`v1/user/source/${user.uid}/primary/ticketNumber`] = '';
      updates[`v1/user/source/${user.uid}/meta/accepted`] = false;
      updates[`v1/user/source/${user.uid}/meta/score`] = 0;
      updates[`v1/user/source/${user.uid}/cross/codelabs`] = null;
      updates[`v1/eventbrite/source/${req.body.id}`] = null;

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
      console.log(error);
      return res
        .status(error.status_code || 500)
        .json(error);
    });
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

  promises.push(
    admin.database().ref(`v1/eventbrite/source/${req.body.id}`).once('value')
  );

  Promise.all(promises)
    .then(results => {
      const user = results[0];
      const json = results[1];
      const snapshot = results[2];

      if (json.status_code === 400) {
        return Promise.reject(json);
      }

      if (!json.profile) {
        return Promise.reject(json);
      }

      if (!user) {
        var error2 = {
          status_code: 404,
          message: 'No User found'
        };
        return Promise.reject(error2);
      }

      if (snapshot.exists()) {
        var eventbriteUser = snapshot.val();
        var error = {
          status_code: 403,
          message: `${eventbriteUser.primary.displayName} has your ticket. Please approach the person to rescan their ticket or you might have scanning another person's ticket.`
        };
        return Promise.reject(error);
      }

      return Promise.all([
        Promise.resolve(user),
        Promise.resolve(json),
        admin
          .database()
          .ref(`v1/user/source/${user.uid}/primary/ticketNumber`)
          .once('value')
      ]);
    })
    .then(results => {
      var user = results[0];
      var json = results[1];
      var snapshot = results[2];

      if (snapshot.exists()) {
        var oldTicketNumber = snapshot.val();
      }

      updates[`v1/user/source/${user.uid}/primary/ticketEmail`] = json.profile.email;
      updates[`v1/user/source/${user.uid}/primary/ticketName`] = json.profile.first_name + ' ' + json.profile.last_name;
      updates[`v1/user/source/${user.uid}/primary/ticketNumber`] = req.body.id;
      updates[`v1/user/source/${user.uid}/meta/accepted`] = true;
      updates[`v1/eventbrite/source/${req.body.id}/primary/displayName`] = user.displayName || user.name || user.email;
      updates[`v1/eventbrite/source/${req.body.id}/primary/email`] = user.email;
      updates[`v1/eventbrite/source/${req.body.id}/primary/uid`] = user.uid;

      if (oldTicketNumber) {
        updates[`v1/eventbrite/source/${oldTicketNumber}`] = null;
      }
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
      console.log(error);
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
