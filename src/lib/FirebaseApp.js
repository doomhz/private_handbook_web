import Firebase from 'firebase'

let FIREBASE_CONF

try {
  FIREBASE_CONF = require('../../config.json').firebase
} catch (e) {
  FIREBASE_CONF = global.APP_CONFIG.firebase
}

export const FIREBASE_APP = Firebase.initializeApp(FIREBASE_CONF)