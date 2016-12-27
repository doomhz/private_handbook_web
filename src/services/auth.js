import { pick } from "lodash"
import { APP, AUTH_KEY_NAME } from '../constants'

const auth = APP.auth()
const LOCAL_STORAGE = window.localStorage
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
    LOCAL_STORAGE.setItem(AUTH_KEY_NAME, JSON.stringify(userData))
    return Promise.resolve(userData)
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

export const loadCurrentUser = ()=> {
  let userData = LOCAL_STORAGE.getItem(AUTH_KEY_NAME)
  try { userData = JSON.parse(userData) } catch (e) {}
  return Promise.resolve(userData)
}

export const signOut = ()=> {
  return auth.signOut()
  .then(()=> {
    return Promise.resolve(LOCAL_STORAGE.removeItem(AUTH_KEY_NAME))
  })
  .catch(()=> {
    return Promise.resolve(LOCAL_STORAGE.removeItem(AUTH_KEY_NAME))
  })
}

export const registerAuthStateChangeEvent = (callback)=> auth.onAuthStateChanged(callback)

export const login = (email, password)=> doAuth(email, password, "login")

export const signup = (email, password)=> doAuth(email, password, "signup")
