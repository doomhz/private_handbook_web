import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import routes from './config/routes'
import configureStore from './config/store'
import { loadCurrentUser } from './store/auth/actions'
import './index.css'

const store = configureStore()

store.dispatch(loadCurrentUser())

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('root')
)
