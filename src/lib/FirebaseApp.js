import Firebase from 'firebase'

let firebaseConfig

try {
  firebaseConfig = require('../../config.json').firebase
} catch (e) {
  // Load it from the parent dir later
}

if (!firebaseConfig) {
  try {
    firebaseConfig = require('../../../config.json').firebase
  } catch (e) {
    console.error('Could not configure Firebase.')
  }
}

export const FIREBASE_APP = Firebase.initializeApp(firebaseConfig)