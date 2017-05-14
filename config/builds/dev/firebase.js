const config = {
  apiKey: 'AIzaSyDbjwolp7ARP8RXLC0btTnfcS-kUm6T-3c',
  authDomain: 'minimal-appshell-test.firebaseapp.com',
  databaseURL: 'https://minimal-appshell-test.firebaseio.com',
  projectId: 'minimal-appshell-test',
  storageBucket: 'minimal-appshell-test.appspot.com',
  messagingSenderId: '26230982541'
}

for (var i in config) {
  exports[i] = config[i]
}
