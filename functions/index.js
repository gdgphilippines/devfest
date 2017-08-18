const functions = require('firebase-functions')
const fetch = require('node-fetch')
const express = require('express')

const app = express()
app.get('/api/landing-temp-link', (req, res) => {
  fetch('https://raw.githubusercontent.com/gdgphilippines/devfestph2017-files/master/content/landing-page-temp-link.md')
  .then(body => {
    return body.text()
  })
  .then(text => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
    res.json({
      success: true,
      data: text
    })
  })
  .catch((e) => {
    res.status(500).json({
      success: false,
      error: e
    })
  })
})

exports.app = functions.https.onRequest(app)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
