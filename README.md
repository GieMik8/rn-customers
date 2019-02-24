# RN Customers

Example Mobile application on React Native, with Typescript, Tslint & Prettier enabled.

## Setup

Follow instructions https://facebook.github.io/react-native/docs/getting-started and prepare environment for developing React Native mobile applications.

## Launching

Locate `.env` file in project's root folder and make you sure you have Google app key inserted (change `XXXXX` with an appropriate key):

```
GOOGLE_APP_KEY=XXXXX
GOOGLE_BASE_URL=https://maps.googleapis.com/maps/api
```

### Launch Android

```
npm install
npm run android
```

### Setup & Launch iOS

```
npm install
npm run ios
```

### ATTENTION!

When editing `.env` variables to really take effect on the App cleaning build files is a must. In order to do so: delete `/android/build` or `/ios/Build` folders or use script:

```
npm run clean
```

And start building a fresh app.

## Production

### Release for Android

To build an app for Android use:

```
npm run android-build
```

Note: Follow these steps for signing `apk`: https://facebook.github.io/react-native/docs/signed-apk-android
