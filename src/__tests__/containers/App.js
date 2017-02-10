import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from '../../config/store'
import App from '../../containers/App'

it.skip('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider store={configureStore()}>
      <App />
    </Provider>
    , div)
})
