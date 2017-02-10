import Immutable from 'seamless-immutable'
import {
  TODO_STATUS_DELETED, TODO_STATUS_ACTIVE, TODO_STATUS_COMPLETED
} from '../../../constants'
import reducer from '../../../store/todos/reducer'
import * as types from '../../../store/todos/action_types'

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([])
  })

  it('should handle TODO_ADDED', ()=> {
    let newTodo = {title: 'test todo 1'}
    let now = Date.now
    Date.now = ()=> 123
    expect(reducer(undefined, {
      type: types.TODO_ADDED,
      todo: newTodo
    })).toEqual([
      {title: 'test todo 1', status: TODO_STATUS_ACTIVE, last_updated: 123}
    ])
    Date.now = now
  })

  it('should handle TODO_UPDATED', ()=> {
    let initialState = Immutable([
      {title: 'test todo 1', status: TODO_STATUS_ACTIVE, last_updated: 1}
    ])
    let newTodo = {title: 'test todo 1', status: TODO_STATUS_COMPLETED}
    let now = Date.now
    Date.now = ()=> 2
    expect(reducer(initialState, {
      type: types.TODO_UPDATED,
      todo: newTodo
    })).toEqual([
      {title: 'test todo 1', status: TODO_STATUS_COMPLETED, last_updated: 2}
    ])
    Date.now = now
  })

  it('should handle TODO_DELETED', ()=> {
    let initialState = Immutable([
      {title: 'test todo 1', status: TODO_STATUS_ACTIVE, last_updated: 1}
    ])
    let newTodo = {title: 'test todo 1', status: TODO_STATUS_ACTIVE, last_updated: 1}
    let now = Date.now
    Date.now = ()=> 2
    expect(reducer(initialState, {
      type: types.TODO_DELETED,
      todo: newTodo
    })).toEqual([
      {title: 'test todo 1', status: TODO_STATUS_DELETED, last_updated: 1}
    ])
    Date.now = now
  })

  it('should handle TODOS_SYNCED', ()=> {
    let initialState = Immutable([
      {title: 'test todo 1', status: TODO_STATUS_ACTIVE, last_updated: 1},
      {title: 'test todo 2', status: TODO_STATUS_ACTIVE, last_updated: 1},
      {title: 'test todo 3', status: TODO_STATUS_COMPLETED, last_updated: 2}
    ])
    let updatedTodos = [
      {title: 'test todo 1', status: TODO_STATUS_COMPLETED, last_updated: 2},
      {title: 'test todo 3', status: TODO_STATUS_ACTIVE, last_updated: 1}
    ]
    let syncedTodos = [
      {title: 'test todo 1', status: TODO_STATUS_COMPLETED, last_updated: 2},
      {title: 'test todo 3', status: TODO_STATUS_COMPLETED, last_updated: 2},
      {title: 'test todo 2', status: TODO_STATUS_ACTIVE, last_updated: 1},
    ]
    expect(reducer(initialState, {
      type: types.TODOS_SYNCED,
      todos: updatedTodos
    })).toEqual(syncedTodos)
  })

  it('should handle TODOS_LOADED', ()=> {
    let todos = [{title: 'test todo 1', status: TODO_STATUS_ACTIVE, last_updated: 1}]
    expect(reducer(undefined, {
      type: types.TODOS_LOADED,
      todos: todos
    })).toEqual(todos)
  })
})