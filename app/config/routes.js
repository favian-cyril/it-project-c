import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import MainContainer from '../containers/MainContainer'
import IndexContainer from '../containers/IndexContainer'
import DashboardContainer from '../containers/DashboardContainer'

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={MainContainer}>
      <IndexRoute component={IndexContainer}/>
      <Route path="dashboard" component={DashboardContainer}/>
    </Route>
  </Router>
)

export default routes
