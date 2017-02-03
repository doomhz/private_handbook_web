import { STORAGE_KEY_NAME } from '../constants'
import { firebase as firebaseConfig } from '../../config.json'
import initFirebaseApp from '../lib/FirebaseApp'
import AsyncStorage from '../lib/AsyncStorage'

const FIREBASE_APP = initFirebaseApp(firebaseConfig)
const db = FIREBASE_APP.database()

const getRemoteTodoDataPathByUser = (uid)=> `/user-todos/${uid}`

export const getLocalTodos = ()=> (
  AsyncStorage.getItem(STORAGE_KEY_NAME)
  .then((todos)=> {
    try { todos = JSON.parse(todos) } catch (e) { todos = null }
    if (!todos) todos = []
    return todos
  })
)

export const setLocalTodos = (todos)=> (
  AsyncStorage.setItem(STORAGE_KEY_NAME, JSON.stringify(todos))
  .then(()=> todos)
)

export const loadRemoteTodosByUser = (uid)=> (
  db.ref(getRemoteTodoDataPathByUser(uid)).once('value')
  .then((snapshot)=> {
    let data = snapshot.val() || {}
    return data.todos || []
  })
)

export const updateRemoteTodosByUser = (uid, todos)=> (
  db.ref().update({
    [getRemoteTodoDataPathByUser(uid)]: {
      uid: uid,
      todos: todos
    }
  })
)
