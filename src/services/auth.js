import { pick } from "lodash"
import { AUTH_KEY_NAME } from '../constants'
import { FIREBASE_APP } from '../lib/FirebaseApp'
import AsyncStorage from '../lib/AsyncStorage'

const auth = FIREBASE_APP.auth()
const AUTH_USER_PROPERTIES = [
  "displayName", "email", "emailVerified", "isAnonymous",
  "photoURL", "redirectEventId", "uid"
]

const doAuth = (email, password, operation = "login")=> {
  let method = null
  switch(operation){
    case "login":
      method = "signInWithEmailAndPassword"
    break;
    case "signup":
      method = "createUserWithEmailAndPassword"
    break;
    default:
      throw new Error(`Unknown auth method for ${operation}`)
  }
  return auth[method](email, password)
  .then((userData)=> {
    userData = pick(userData, AUTH_USER_PROPERTIES)
    return AsyncStorage.setItem(AUTH_KEY_NAME, JSON.stringify(userData)).then(()=> userData)
  })
  .catch((error)=> {
    let message = null
    switch(error.code){
      case "auth/email-already-in-use":
        message = "The new user account cannot be created because the email is already in use.";
      break;
      case "auth/invalid-email":
        message = "The specified email is not a valid email.";
      break;
      case "auth/weak-password":
        message = "Please specify a strong password, min 6 chars.";
      break;
      default:
        message = operation === "login" ? "Login Failed. Please try again." : "Error creating user.";
    }
    throw new Error(message, error)
  });
}

export const loadCurrentUser = ()=> (
  AsyncStorage.getItem(AUTH_KEY_NAME)
  .then((userData) => {
    try { userData = JSON.parse(userData) } catch (e) {}
    return userData
  })
)

export const signOut = ()=> (
  auth.signOut()
  .then(()=> AsyncStorage.removeItem(AUTH_KEY_NAME))
  .catch(()=> AsyncStorage.removeItem(AUTH_KEY_NAME))
)

export const registerAuthStateChangeEvent = (callback)=> auth.onAuthStateChanged(callback)

export const login = (email, password)=> doAuth(email, password, "login")

export const signup = (email, password)=> doAuth(email, password, "signup")
