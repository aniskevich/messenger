import React from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import {MessengerPage} from '../pages/MessengerPage'
import {AuthPage} from '../pages/AuthPage'

export const isAuth = true

export const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={MessengerPage} />
        <Route path='/auth' component={AuthPage} />
        <Redirect to='/' />
      </Switch>
    </Router>
  )
}
