import * as types from './action_types'

const initialState = Immutable([])

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.TODOS_SYNCED:
      return Immutable(action.todos)
    default:
      return state;
  }
}

export function getTodos(state) {
  return state.todos
}