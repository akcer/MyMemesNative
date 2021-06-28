# MyMemesNative

Memes Mobile App build with React Native

## Requirements

- Node.js
- MongoDB
- Android Studio OR Expo Go

## Installation

- Set up API [MyMemesAPI](https://github.com/akcer/MyMemesAPI)
- Set Environment Variable in .env file `MOBILE_APP_HOST` to `http://localhost:19006` if you run your app in web browser or to `http://Your Local Machine IP Address:19006` if you run your app on mobile device or Android Studio.

- If you are new to Expo install the command line tool

```
$ npm install --global expo-cli

```

- Clone project

```
$ git clone https://github.com/akcer/MyMemesNative.git
```

- Enter the project directory:

```
$ cd MyMemesNative
```

- Install NPM dependencies:

```
$ npm install
```

- Run the development server:

```
$ npm start
```

- Go to http://localhost:19002 to access the API.

- To run App on web browser in `app.config.js` file set `process.env.API_URL` to `http://localhost:3001`

- To run App on Android Studio follow this [guide](https://docs.expo.io/workflow/android-studio-emulator/) and in `app.config.js` file set `process.env.API_URL` to `http://Your Local Machine IP Address:3001`

- To run App on Your Mobile Device follow this [guide](https://docs.expo.io/get-started/installation/#2-expo-go-app-for-ios-and) and in `app.config.js` file set `process.env.API_URL` to `http://Your Local Machine IP Address:3001`

## Technologies

- React Native
- React Native Elements
- Expo
