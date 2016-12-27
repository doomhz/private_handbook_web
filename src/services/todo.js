import {
  STORAGE_KEY_NAME, APP
} from '../constants'

const db = APP.database()
const LOCAL_STORAGE = window.localStorage

const getRemoteTodoDataPathByUser = (uid)=> `/user-todos/${uid}`

export const getLocalTodos = ()=> {
  let todos = LOCAL_STORAGE.getItem(STORAGE_KEY_NAME)
  try {
    todos = JSON.parse(todos)
  } catch (e) {
    todos = []
  }
  if (!todos) todos = []
  return Promise.resolve(todos)
}

export const setLocalTodos = (todos)=> Promise.resolve(
  LOCAL_STORAGE.setItem(STORAGE_KEY_NAME, JSON.stringify(todos))
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
