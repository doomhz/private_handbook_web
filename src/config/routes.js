import React from 'react'
import App from '../components/App'
import Home from '../components/Home'
import Login from '../components/Login'
import Signup from '../components/Signup'
import TodosSummary from '../components/TodosSummary'
import TodosList from '../components/TodosList'
import Info from '../components/Info'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

module.exports =
  <Router history={browserHistory}>
    <Route path={"/"} component={App}>
      <IndexRoute component={Home} />
      <Route path={'todos'} component={TodosSummary} />
      <Route path={'todos/:type'} component={TodosList} />
      <Route path={'info/:type'} component={Info} />
      <Route path={'login'} component={Login} />
      <Route path={'signup'} component={Signup} />
    </Route>
  </Router>