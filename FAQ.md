# FAQ

1. npm start fails

- if it fails because of the following: `optipng`, `node-sass`, do the following:
```
$ cd gulp
$ rm -r node_modules
$ yarn install
```

- if it fails because of Firebase
  - make sure you have `.firebaserc`
  - if not, do the following:
```
$ firebase login
$ firebase use --add
# then pick your own devfest firebase project in your account
```

2. If other things fail, please report to the issue tracker or to our Slack channel