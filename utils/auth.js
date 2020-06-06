import React from 'react'
import { Constants } from 'expo'
import * as Google from 'expo-google-app-auth'
import { Asset } from 'expo-asset'

import { GOOGLE_IOS_CLIENT_ID } from 'react-native-dotenv'
import { auth, firestore } from '../Firebase'
import { uploadPost } from './sharePost'

// Google Login
export const loginWithGoogle = async () => {
  try {
    const { type, accessToken, user } = await Google.logInAsync({
      iosClientId: GOOGLE_IOS_CLIENT_ID,
      scopes: [ 'profile', 'email' ]
    })

    if (type === 'success') {
      console.log('USER', user)
      console.log('ACCESS TOKEN', accessToken)
      console.log('TYPE', type)
    }
  } catch (e) {
    console.error('Error logging in: ', e)
  }
}

// Google Login Helper
const onGoogleSignIn = googleUser => {
  console.log('Google Auth Response', googleUser)
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
    unsubscribe()
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      const credential = auth.GoogleAuthProvider.credential(googleUser.idToken, googleUser.accessToken)
      // Sign in with credential from the Google user.
      auth
        .signInWithCredential(credential)
        .then(result => {
          console.log('USER SIGNED IN: ', result)
          if (result.additionalUserInfo.isNewUser) {
            firestore.collection('users').doc(result.user.uid).set({
              email: result.user.email.toLowerCase(),
              // username:
              name: `${result.additionalUserInfo.profile.given_name} ${result.additionalUserInfo.profile.family_name}`,
              created_at: Date.now()
            })
          } else {
            firestore.collection('users').doc(result.user.uid).update({
              last_logged_in: Date.now()
            })
          }
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message

          console.error(errorCode, ': ', errorMessage)
          // The email of the user's account used.
          var email = error.email
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential
          // ...
          console.log('email: ', email, 'credentials: ', credential)
        })
    } else {
      console.log('User already signed-in Firebase.')
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
        followers: 0,
        following: 0
      })
      await auth.signInWithEmailAndPassword(email, password)
      // navigation.navigate('App')
      // navigation.navigate('Home')
      console.log('SIGNED IN!')
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
    // navigation.navigate('Login')
    return true
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
