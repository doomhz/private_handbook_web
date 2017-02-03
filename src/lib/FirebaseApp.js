import Firebase from 'firebase'

const {firebase:firebaseConfig} = require('./../../config.json')

export const FIREBASE_APP = Firebase.initializeApp(firebaseConfig)