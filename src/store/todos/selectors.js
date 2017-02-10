import {groupBy, filter} from 'lodash'

const compareTodos = (a, b)=> {
  if (a.status !== 'active' && b.status === 'active') return 1
  if (a.status === 'active' && b.status !== 'active') return -1
  return 0
}


export const getTodos = (state)=> state.todos

export const getTodosByType = (state, type)=> {
  if (!type) return filter(state.todos, (t)=> t.status !== 'deleted')
  return filter(state.todos, (t)=> t.type === type && t.status !== 'deleted').sort(compareTodos)
}

export const getTodosByStatus = (state, status)=> filter(state.todos, (t)=> t.status === status).sort(compareTodos)

export const getGroupedTodosByTypeAndStatus = (state, status)=> groupBy(getTodosByStatus(state, status), 'type')
