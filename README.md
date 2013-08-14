# iTrain Angular Application

This is the repository for the Angular version of the iTrain application.

## Git Flow

This project uses the git flow workflow for maintaining revision history.
Specifically, we are using the [AVH version](https://github.com/petervanderdoes/gitflow). 

* Original [Post](http://nvie.com/posts/a-successful-git-branching-model/)
* AVH Git Flow [Wiki](https://github.com/petervanderdoes/gitflow/wiki)

## Developer Dependencies

You must install the following utilities in order to work on the app:

* Git
* Git Flow (AVH version)
* NodeJS
* NPM

### Install Git

See the [Installing Git](http://git-scm.com/book/en/Getting-Started-Installing-Git) section of the Git website.

### Install Git Flow

Check out the [manual installation instructions](https://github.com/petervanderdoes/gitflow/wiki/Installing-manually)
(this may be different for your OS)

    git clone https://github.com/petervanderdoes/gitflow
    cd gitflow
    git fetch --tags
    git checkout 1.6.1 -b release/1.6.1
    sudo make install
    cd ../
    rm -rf gitflow

### Install NodeJS and NPM

Node and NPM have pre-built binaries for many OS versions listed on their [download page](http://nodejs.org/download/)

## Setup

* Install node modules: `npm install`
* Setup your `PATH` to run npm binaries: `export PATH=$PATH:./node_modules/.bin`

## Common Tasks

Most tasks are configured to be run via node's task runner: Grunt.

* Start work on a new feature, named "my feature 1": `grunt feature:start:my-feature-1`
* Finish the feature: `grunt test feature:finish:my-feature-1`
* Check a script for errors: `jshint my-script.js`
* Test the app: `grunt test`
