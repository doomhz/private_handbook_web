import {differenceBy} from 'lodash'
import {TODO_STATUS_ACTIVE, TODO_STATUS_DELETED} from '../../constants'
import * as types from './action_types'
import Immutable from 'seamless-immutable'

const initialState = Immutable([])

const mergeTodos = (todos1 = [], todos2 = [])=> {
  let mergedTodos = []
  todos1.forEach((t1)=> {
    let sameTitleTodos = todos2.filter((t)=> {
      return t.title === t1.title
    })
    if (!sameTitleTodos || !sameTitleTodos.length) return mergedTodos.push(Object.assign({}, t1))
    sameTitleTodos.push(Object.assign({}, t1))
    sameTitleTodos.sort((a, b)=> {
      if (a.last_updated < b.last_updated) return 1
      if (a.last_updated > b.last_updated) return -1
      return 0
    })
    mergedTodos.push(Object.assign({}, sameTitleTodos[0]))
  })
  mergedTodos = mergedTodos.concat(differenceBy(todos2, todos1, 'title'))
  return mergedTodos
}


export default function reducer(state = initialState, action = {}) {
  let todos
  switch (action.type) {
    case types.TODO_ADDED:
      const todo = Object.assign({
        status: TODO_STATUS_ACTIVE,
        last_updated: Date.now()
      }, action.todo)
      return Immutable([todo].concat(state))
    case types.TODO_UPDATED:
      todos = state.map((item)=> {
        if (item.status !== TODO_STATUS_DELETED && item.title === action.todo.title) {
          return Object.assign({}, item, action.todo, {last_updated: Date.now()})
        }
        return item
      })
      return Immutable(todos)
    case types.TODO_DELETED:
      todos = state.map((item)=> {
        if (item.status !== TODO_STATUS_DELETED && item.title === action.todo.title) {
          item = Object.assign({}, action.todo, {status: TODO_STATUS_DELETED})
        }
        return item
      })
      return Immutable(todos)
    case types.TODOS_SYNCED:
      todos = mergeTodos(action.todos, state.asMutable())
      return Immutable(todos)
    case types.TODOS_LOADED:
      return Immutable(action.todos)
    default:
      return state
  }
}
