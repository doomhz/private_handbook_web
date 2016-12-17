export const TYPE_DO = "DO"
export const TYPE_DECIDE = "DECIDE"
export const TYPE_DELEGATE = "DELEGATE"
export const TYPE_DELETE = "DELETE"
export const STORAGE_KEY_NAME = "todos"
export const AUTH_KEY_NAME = "user_data"
export const TYPE_TITLES = {
  [`${TYPE_DO}`]: "Urgent Important",
  [`${TYPE_DECIDE}`]: "Not Urgent Important",
  [`${TYPE_DELEGATE}`]: "Urgent Not Important",
  [`${TYPE_DELETE}`]: "Not Urgent Not Important",
}

import Firebase from 'firebase'
import config from '../../config.json'

export const APP = Firebase.initializeApp(config.firebase)