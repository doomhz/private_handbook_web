import Firebase from 'firebase'

let FIREBASE_APP

export default function initFirebaseApp(firebaseConfig){
  if (FIREBASE_APP) {
    return FIREBASE_APP
  }
  if (!firebaseConfig) {
    firebaseConfig = require('../../config.json').firebase
  }
  FIREBASE_APP = Firebase.initializeApp(firebaseConfig)
  return FIREBASE_APP
}