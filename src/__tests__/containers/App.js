import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import routes from '../../config/routes'
import configureStore from '../../config/store'
import App from '../../containers/App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider store={configureStore()}>
      <Router history={browserHistory}>{routes}</Router>
    </Provider>,
    div
  )
})
