import * as types from './action_types'

export function syncTodos() {
  return async(dispatch, getState) => {
    try {
      // TODO: Sync here
      const todos = []
      dispatch({ type: types.TODOS_SYNCED, todos })
    } catch (error) {
      console.error(error)
    }
  };
}