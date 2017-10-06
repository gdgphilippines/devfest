# Devfest Ph 2017
[![Stories in Ready](https://badge.waffle.io/gdgphilippines/devfest.svg?label=ready&title=Ready)](http://waffle.io/gdgphilippines/devfest)
[![Stories In Progress](https://badge.waffle.io/gdgphilippines/devfest.svg?label=in%20progress&title=In%20Progress)](http://waffle.io/gdgphilippines/devfest)
[![Build Status](https://travis-ci.org/gdgphilippines/devfest.svg?branch=master)](https://travis-ci.org/gdgphilippines/devfest)
[![Build Status](https://travis-ci.org/gdgphilippines/devfest.svg?branch=develop)](https://travis-ci.org/gdgphilippines/devfest)

## How to fork this project?

Make your own copy of the devfest project to your account.

```bash
# Clone from your forked repository
$ git clone git@github.com:[your_username]/devfest.git # for SSH
# or
$ git clone https://github.com/[your_username]/devfest.git # for HTTPS

# enter the project
$ cd devfest

# Add upstream connection to the original devfest repo
# This will help on contributing to the project and be updated
$ git remote add upstream https://github.com/gdgphilippines/devfest.git

# We always start our work on the branch develop.
$ git checkout develop

# Always pull at develop branch for any changes
$ git pull
```

## Getting Started

Please work the site on any UNIX type of system: Linux or MacOS. 
If you don't have any working Linux at your disposal (because you are working on Windows, please contact me immediately with your email)

#### Make sure that you have git installed in your Unix distro
```bash
# check if you have git
$ git 
```

If you don't have git:
```bash
# for Ubuntu/debian
$ sudo apt-get install git 

# for Fedora
$ yum -y install git 

# for OSX
$ brew update
$ brew install git
```

#### Make sure you have version 6.11.2 of Node JS and version 3.+ of NPM.
You can check this via:
```bash
$ node --version
$ npm --version
```

If not, do the following:
```bash
# installs node version manager
# close terminal after installation and then reopen it again
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.4/install.sh | bash       

# install version node 6.11.2 and npm 3.+
$ nvm install 6.11.2

# makes it default
$ nvm alias default 6.11.2
```

#### Install additional tools
```bash
$ npm i -g yarn bower karma-cli firebase-tools slush slush-polypack firebase-tools
```
Trust me, you will need them.

#### Install dependencies using slush
```bash
$ slush polypack:install
```
The devfest site is using a new experimental build called polypack, and it has an easy way to install dependencies.
Just run the above command and it will install all dependencies of the project. If it doesn't work, this should be done
```bash
# on project folder
$ yarn install --flat
$ bower install
$ cd gulp
$ yarn install
$ cd ../functions
$ yarn install
$ cd ..
```

#### Setup firebase
Go to your firebase account at https://firebase.google.com and create a project 
(you can name it anything you want but I suggest using `devfest-{your_name}`)

Once done, login into your firebase account on the project:
```bash
$ firebase login
$ firebase use --add
```
Pick the newly created project: `devfest-{your_name}`
And then write it as staging.

This should create a `.firebaserc` in your folder


And you're done.

Next...

## Running the Application locally

To run the app.

```bash
$ npm start
```
You should be able to run the project at `localhost:5000`

**NOTE:** *Make sure you setup Firebase since `npm start` will return some errors.*

If you want to run using your own http server, just run...

```bash
$ npm start -- --no-server
```

If you want to build the project without watching...

```bash
$ npm run build
```

If you want to build the project for production...

```bash
$ npm run build-production
```

## Deploying in Firebase

Deploying it into your own Firebase account would simply be:
```bash
$ firebase deploy
```
The project can then be viewed in: `https://devfest-{your-project-id}.firebaseapp.com`

## FAQ
See [FAQ.md](FAQ.md)

## Contributing
See the [CONTRIBUTING Guidelines](https://github.com/gdgphilippines/devfest/blob/master/CONTRIBUTING.md)

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/gdgphilippines/devfest/issues).
