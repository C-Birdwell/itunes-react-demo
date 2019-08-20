import React from 'react'
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'
import DashboardPage from '../components/DashboardPage'
import FavoritesPage from '../components/FavoritesPage'

import NotFoundPage from '../components/NotFoundPage'
import Header from '../components/Header'
import LoadingGraphic from '../components/LoadingGraphic'

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={DashboardPage} exact={true} />
        <Route path="/favorites" component={FavoritesPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <LoadingGraphic />
    </div>
  </BrowserRouter>
)

export default AppRouter
