## Git Gud Scrub [![Build Status](https://travis-ci.org/teh-username/git-gud-scrub.svg?branch=master)](https://travis-ci.org/teh-username/git-gud-scrub) [![Coverage Status](https://coveralls.io/repos/github/teh-username/git-gud-scrub/badge.svg?branch=master)](https://coveralls.io/github/teh-username/git-gud-scrub?branch=master)

A simple web app to help you learn [git](https://git-scm.com/about). Helps visualize all the moving parts of common git commands in one dashboard.

App can be found [here](https://gitgudscrub.xyz/). Updated frequently!

### Running Locally

To run a local copy of the application, do the following:

```
git clone https://github.com/teh-username/git-gud-scrub.git
cd git-gud-scrub
yarn install
yarn start
```

You can also do `yarn test` to run tests locally as well.

#### Ice Box (Prioritized)

1. Keep to state the available files per branch
2. git checkout [--]
3. git rm
4. git rebase
5. Real time collaboration (remote repo related commands)

### Release Notes

## Version 1

Support for the following commands:

* git add
* git commit -m "message"
* git checkout [-b] <branch_name>
* git branch [-d] <branch_name>

Implementation of the following feature set:

* "console" like interface
* Real time commit graph display
* Set Code Coverage level to 90-ish
