import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'

import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID
} from 'react-native-dotenv'

// Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID
}

class Fire {
  constructor() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig)

    // Listen for auth
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        console.log('USER LOGGED IN')
      }
      // if (!user) {
      //   await firebase.auth().signInAnonymously()
      // }
    })
  }
}

Fire.shared = new Fire()
export default Fire

export const auth = firebase.auth()
export const storage = firebase.storage()
export const firestore = firebase.firestore()
export const fieldValue = firebase.firestore.FieldValue
