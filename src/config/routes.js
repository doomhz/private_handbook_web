import React from 'react'
import App from '../components/App'
import Home from '../components/Home'
import Login from '../components/Login'
import Todos from '../components/Todos'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

module.exports =
  <Router history={browserHistory}>
    <Route path={"/"} component={App}>
      <IndexRoute component={Home} />
      <Route path={'todos'} component={Todos} />
      <Route path={'login'} component={Login} />
    </Route>
  </Router>