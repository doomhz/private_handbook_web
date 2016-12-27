import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import * as reducers from '../store/reducers';

export default function configureStore(preloadedState) {
  let middleware
  if (process.env.NODE_ENV !== "production") {
    middleware = applyMiddleware(thunk, createLogger())
  } else {
    middleware = applyMiddleware(thunk)
  }

  const store = createStore(combineReducers(reducers), preloadedState, middleware)

  return store
}
