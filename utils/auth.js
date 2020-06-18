import { Constants } from 'expo'
import * as Google from 'expo-google-app-auth'
import { Asset } from 'expo-asset'
import firebase from 'firebase/app'

import { GOOGLE_IOS_CLIENT_ID } from 'react-native-dotenv'
import { auth, firestore } from '../Firebase'
import { uploadPost } from './sharePost'

// Google Login
export const loginWithGoogle = async () => {
  try {
    const result = await Google.logInAsync({
      iosClientId: GOOGLE_IOS_CLIENT_ID,
      scopes: [ 'profile', 'email' ]
    })

    if (result.type === 'success') {
      onGoogleSignIn(result)
    }
  } catch (e) {
    console.error('Error logging in: ', e)
  }
}

// Google Login Helper
const onGoogleSignIn = googleUser => {
  console.log('Google Auth Response', googleUser)
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  const unsubscribe = firebase.auth().onAuthStateChanged(async firebaseUser => {
    unsubscribe()

    try {
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        const credential = firebase.auth.GoogleAuthProvider.credential(googleUser.idToken, googleUser.accessToken)
        // Sign in with credential from the Google user.
        const result = await firebase.auth().signInWithCredential(credential)

        console.log('USER SIGNED IN: ', result)
        if (result.additionalUserInfo.isNewUser) {
          const path = `userAvatars/${result.user.uid}/avatar.png`
          const uploadUri = Asset.fromModule(require('../assets/images/default-avatar.png'))
          const { uri } = await uploadPost(uploadUri.uri, path)
          console.log('URI', uri)

          const { given_name, family_name } = result.additionalUserInfo.profile
          let username = `${given_name.toLowerCase()}${family_name.toLowerCase()}`

          const usernameRef = await firestore.collection('users').where('username', '==', username).get()

          let results = usernameRef.docs.map(doc => doc.data())
          if (results.length > 0) {
            username += result.user.uid
          }

          const newUser = await firestore.collection('users').doc(result.user.uid).set({
            email: result.user.email.toLowerCase(),
            username,
            name: `${given_name} ${family_name}`,
            bio: '',
            userAvatar: uri,
            followers: [],
            following: [],
            created_at: Date.now()
          })
        } else {
          console.log('IS NOT NEW USER')

          await firestore.collection('users').doc(result.user.uid).update({
            last_logged_in: Date.now()
          })
        }
      } else {
        console.log('User already signed-in with Firebase.')
      }
    } catch (err) {
      // The email of the user's account used and the firebase.auth.AuthCredential type that was used
      console.error('GOOGLE SIGN IN ERROR - code: ', err)
    }
  })
}

// Email/Password Signup
export const signupWithEP = async (name, username, email, password, navigation) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password)
    if (user) {
      console.log('SIGN UP W EP USER', user)
      const path = `userAvatars/${user.uid}/avatar.png`
      const uploadUri = Asset.fromModule(require('../assets/images/default-avatar.png'))

      console.log('URI***', uploadUri)
      const { uri } = await uploadPost(uploadUri.uri, path)
      await firestore.collection('users').doc(user.uid).set({
        email: user.email,
        name,
        username,
        created_at: Date.now(),
        userAvatar: uri,
        followers: [],
        following: []
      })
      await auth.signInWithEmailAndPassword(email, password)
      console.log('SIGNED IN W/ EP!')
    }
  } catch (err) {
    const errMessage = err.message
    console.error('Signup Error: ', errMessage)
  }
}

// Auth Login
export const loginWithEP = async (email, password) => {
  try {
    const user = await auth.signInWithEmailAndPassword(email, password)
    // console.log('USER LOGGED IN: ', user)
  } catch (err) {
    const errMessage = err.message
    console.error('Login Error: ', errMessage)
  }
}

// Auth Logout
export const logout = navigation => {
  try {
    auth.signOut()
    console.log('USER LOGGED OUT')
    navigation.popToTop()
  } catch (err) {
    const errMessage = err.message
    console.error('Logout Error: ', errMessage)
  }
}

// Check Login
export const checkLogin = () => {
  try {
    let user = null
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log('USER IS LOGGED IN')
        user = true
      } else {
        console.log('USER IS LOGGED OUT')
        user = false
      }
    })
    return user
  } catch (err) {
    console.error('Login Check Error: ', err)
  }
}

// Check Errors
export const checkErrors = (email, password) => {
  switch ((email, password)) {
    case email === '' && password === '':
      return console.error('empty email and password')
    case email !== '' && password === '':
      return console.error('empty password')
    case email === '' && password !== '':
      return console.error('empty email')
    default:
      return console.log('no errors')
  }
}

// User Info
export const getUser = () => {
  const { deviceId, deviceName, platform } = Constants
  return { deviceId, deviceName, platform }
}

// Check if users are same
const isUserEqual = (googleUser, firebaseUser) => {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData
    for (var i = 0; i < providerData.length; i++) {
      if (
        providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.getBasicProfile().getId()
      ) {
        // We don't need to reauth the Firebase connection.
        return true
      }
    }
  }
  return false
}
