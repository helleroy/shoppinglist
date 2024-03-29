## [1.5.1](https://github.com/helleroy/shoppinglist/compare/v1.5.0...v1.5.1) (2022-01-19)

### Bug Fixes

- attempt to force sw update on iOS ([929d8b1](https://github.com/helleroy/shoppinglist/commit/929d8b1c2e6148f8cc6e354a1eb34a357555bb2d))

# [1.5.0](https://github.com/helleroy/shoppinglist/compare/v1.4.3...v1.5.0) (2022-01-16)

### Bug Fixes

- hide create list input field in a collapsible ([19d1820](https://github.com/helleroy/shoppinglist/commit/19d1820e46e7b9b782d648a7d4eec4748bf1fd5a))
- hide sign out button in a collapsible ([8616c26](https://github.com/helleroy/shoppinglist/commit/8616c264d95211567a1bac32479aed30503bc6af))
- move share and delete list into the hidden header ([cc3a014](https://github.com/helleroy/shoppinglist/commit/cc3a0142c9c00e110f1c128fe2b965bee04acbb5))

### Features

- option to clear the list if all items are complete ([7eedc91](https://github.com/helleroy/shoppinglist/commit/7eedc91bd08768353983dd24c96fca15a3f526a1))

## [1.4.3](https://github.com/helleroy/shoppinglist/compare/v1.4.2...v1.4.3) (2022-01-15)

### Bug Fixes

- bi-annual dependency bump ([df7a898](https://github.com/helleroy/shoppinglist/commit/df7a898d7224d3a3e2f48b546a75163531e09d55))

## [1.4.2](https://github.com/helleroy/shoppinglist/compare/v1.4.1...v1.4.2) (2020-04-05)

### Bug Fixes

- update dialog when service worker finds an update ([a346b89](https://github.com/helleroy/shoppinglist/commit/a346b891d79ba8401e6f8c0d301fa08b4f01112a))

## [1.4.1](https://github.com/helleroy/shoppinglist/compare/v1.4.0...v1.4.1) (2020-04-01)

### Bug Fixes

- scroll to focused list element when sorting ([1c2b7d4](https://github.com/helleroy/shoppinglist/commit/1c2b7d4cb51fc9467901be51b3584404b9e083ae))

# [1.4.0](https://github.com/helleroy/shoppinglist/compare/v1.3.0...v1.4.0) (2020-03-31)

### Bug Fixes

- ensure scroll indicator is below the lists ([2370f44](https://github.com/helleroy/shoppinglist/commit/2370f44952180daaff2e959d2b6d78f85cacc8a4))

### Features

- buttons to sort list order ([81b3dcf](https://github.com/helleroy/shoppinglist/commit/81b3dcf4fe4251477cbc37427495190deef1ad37))

# [1.3.0](https://github.com/helleroy/shoppinglist/compare/v1.2.9...v1.3.0) (2020-03-25)

### Features

- horizontal swipe to switch between lists ([b09532f](https://github.com/helleroy/shoppinglist/commit/b09532f8b326777c33b0988f91cd581860488fde))

## [1.2.9](https://github.com/helleroy/shoppinglist/compare/v1.2.8...v1.2.9) (2020-03-21)

### Bug Fixes

- update firebase config in the messaging service worker ([b92b15a](https://github.com/helleroy/shoppinglist/commit/b92b15a9fbeb0d30dde7011bf72d5c07bb7472b5))

## [1.2.8](https://github.com/helleroy/shoppinglist/compare/v1.2.7...v1.2.8) (2020-03-21)

### Bug Fixes

- avoid initializing Firebase Messaging if it's not supported ([7f8b439](https://github.com/helleroy/shoppinglist/commit/7f8b439525ce48f503546e00bbc87fe01b87d968))

## [1.2.7](https://github.com/helleroy/shoppinglist/compare/v1.2.6...v1.2.7) (2020-03-21)

### Bug Fixes

- use default FIREBASE_TOKEN env variable when deploying ([29e8a59](https://github.com/helleroy/shoppinglist/commit/29e8a59dcbc7685eee11cf67bdc5d32ffd5a475f))

## [1.2.6](https://github.com/helleroy/shoppinglist/compare/v1.2.5...v1.2.6) (2020-03-21)

### Bug Fixes

- update Firebase config ([1f1e39d](https://github.com/helleroy/shoppinglist/commit/1f1e39d62ae18e633ca1b3de8b508e1a0486bd66))

## [1.2.5](https://github.com/helleroy/shoppinglist/compare/v1.2.4...v1.2.5) (2019-05-24)

### Bug Fixes

- remove deprecated firestore setting ([42d17ae](https://github.com/helleroy/shoppinglist/commit/42d17ae))
- rename sharedWithNotification Function ([401b45a](https://github.com/helleroy/shoppinglist/commit/401b45a))

## [1.2.4](https://github.com/helleroy/shoppinglist/compare/v1.2.3...v1.2.4) (2018-11-09)

### Bug Fixes

- add service worker config to prevent it from crashing ([0f57101](https://github.com/helleroy/shoppinglist/commit/0f57101))

## [1.2.3](https://github.com/helleroy/shoppinglist/compare/v1.2.2...v1.2.3) (2018-11-09)

### Bug Fixes

- improve PWA functionality after Lighthouse Audit ([98a17f6](https://github.com/helleroy/shoppinglist/commit/98a17f6))

## [1.2.2](https://github.com/helleroy/shoppinglist/compare/v1.2.1...v1.2.2) (2018-11-08)

### Bug Fixes

- add button to toggle list details ([00cbfa9](https://github.com/helleroy/shoppinglist/commit/00cbfa9)), closes [#7](https://github.com/helleroy/shoppinglist/issues/7)
- handle header text and input field overflow ([688987e](https://github.com/helleroy/shoppinglist/commit/688987e)), closes [#3](https://github.com/helleroy/shoppinglist/issues/3)

## [1.2.1](https://github.com/helleroy/shoppinglist/compare/v1.2.0...v1.2.1) (2018-10-30)

### Bug Fixes

- let notification click open the app ([7e0ae89](https://github.com/helleroy/shoppinglist/commit/7e0ae89))

# [1.2.0](https://github.com/helleroy/shoppinglist/compare/v1.1.1...v1.2.0) (2018-10-28)

### Features

- **messaging:** push notifications when a list is shared with you ([8c07b71](https://github.com/helleroy/shoppinglist/commit/8c07b71)), closes [#6](https://github.com/helleroy/shoppinglist/issues/6)

## [1.1.1](https://github.com/helleroy/shoppinglist/compare/v1.1.0...v1.1.1) (2018-10-25)

### Bug Fixes

- **deps:** react 16.6 and other dependencies ([7211dea](https://github.com/helleroy/shoppinglist/commit/7211dea))
- blur share list and create list fields on submit ([7e99571](https://github.com/helleroy/shoppinglist/commit/7e99571)), closes [#5](https://github.com/helleroy/shoppinglist/issues/5)

# [1.1.0](https://github.com/helleroy/shoppinglist/compare/v1.0.3...v1.1.0) (2018-10-25)

### Bug Fixes

- resolve delete list regression ([b82fd23](https://github.com/helleroy/shoppinglist/commit/b82fd23))

### Features

- sort lists by dragging and dropping ([a441d84](https://github.com/helleroy/shoppinglist/commit/a441d84))

## [1.0.3](https://github.com/helleroy/shoppinglist/compare/v1.0.2...v1.0.3) (2018-10-23)

### Bug Fixes

- reset state on signout ([43ac3ba](https://github.com/helleroy/shoppinglist/commit/43ac3ba))

## [1.0.2](https://github.com/helleroy/shoppinglist/compare/v1.0.1...v1.0.2) (2018-10-23)

### Bug Fixes

- commit changelog, package.json and package-lock.json on release ([a754db6](https://github.com/helleroy/shoppinglist/commit/a754db6))

## [1.0.1](https://github.com/helleroy/shoppinglist/compare/v1.0.0...v1.0.1) (2018-10-23)

### Bug Fixes

- separate services from firebase ([71271f0](https://github.com/helleroy/shoppinglist/commit/71271f0))

# [1.0.0](https://github.com/helleroy/shoppinglist/tree/v1.0.0) (2018-10-22)

### Bug Fixes

- clean up all listeners on unmount ([66e4788](https://github.com/helleroy/shoppinglist/commit/66e4788))
- disable destructive operations for non-owners ([b61720a](https://github.com/helleroy/shoppinglist/commit/b61720a))
- favicon, title and other metadata ([d9dd741](https://github.com/helleroy/shoppinglist/commit/d9dd741))
- favicons for all platforms ([6e6ea2a](https://github.com/helleroy/shoppinglist/commit/6e6ea2a))
- handle prop updates from Firebase properly ([5d94c04](https://github.com/helleroy/shoppinglist/commit/5d94c04))
- hide unshare button instead of disabling it ([da19323](https://github.com/helleroy/shoppinglist/commit/da19323))
- make list item height grow automatically ([02a55bd](https://github.com/helleroy/shoppinglist/commit/02a55bd))
- make list name editable ([8813544](https://github.com/helleroy/shoppinglist/commit/8813544))
- remove autocomplete from list creation form ([99211d6](https://github.com/helleroy/shoppinglist/commit/99211d6))
- remove shared users properly ([2d18712](https://github.com/helleroy/shoppinglist/commit/2d18712))
- resize and move elements to look better on mobile ([25a0a42](https://github.com/helleroy/shoppinglist/commit/25a0a42))
- responsive app header on small screens in portrait mode ([214b912](https://github.com/helleroy/shoppinglist/commit/214b912))
- responsive list footer ([d25d090](https://github.com/helleroy/shoppinglist/commit/d25d090))
- stop blocking state update on user login ([f2d6f3c](https://github.com/helleroy/shoppinglist/commit/f2d6f3c))
- style name and checkmark to have a clickable cursor ([e3084ae](https://github.com/helleroy/shoppinglist/commit/e3084ae))

### Features

- first version with Firebase deployment! ([dc96dcb](https://github.com/helleroy/shoppinglist/commit/dc96dcb))
