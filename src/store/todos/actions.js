import * as types from './action_types'
import {getTodos} from './selectors'
import {getCurrentUser} from '../auth/selectors'
import * as service from '../../services/todo'

export const syncTodos = ()=> (
  async(dispatch, getState) => {
    try {
      const user = getCurrentUser(getState())
      if (!user) return
      const todos = await service.loadRemoteTodosByUser(user.uid)
      dispatch({ type: types.TODOS_SYNCED, todos })
      await service.setLocalTodos(getTodos(getState()))
      await service.updateRemoteTodosByUser(user.uid, getTodos(getState()))
    } catch (error) {
      console.error(error)
    }
  }
)

export const loadTodos = (opts)=> (
  async(dispatch, getState) => {
    try {
      const todos = await service.getLocalTodos()
      dispatch({ type: types.TODOS_LOADED, todos })
      if (opts.sync) dispatch(syncTodos())
    } catch (error) {
      console.error(error)
    }
  }
)

export const addTodo = (todo, opts)=> (
  async(dispatch, getState) => {
    try {
      dispatch({ type: types.TODO_ADDED, todo })
      await service.setLocalTodos(getTodos(getState()))
      if (opts.sync) dispatch(syncTodos())
    } catch (error) {
      console.error(error)
    }
  }
)

export const updateTodo = (todo, opts)=> (
  async(dispatch, getState) => {
    try {
      dispatch({ type: types.TODO_UPDATED, todo })
      await service.setLocalTodos(getTodos(getState()))
      if (opts.sync) dispatch(syncTodos())
    } catch (error) {
      console.error(error)
    }
  }
)

export const deleteTodo = (todo, opts)=> (
  async(dispatch, getState) => {
    try {
      dispatch({ type: types.TODO_DELETED, todo })
      await service.setLocalTodos(getTodos(getState()))
      if (opts.sync) dispatch(syncTodos())
    } catch (error) {
      console.error(error)
    }
  }
)