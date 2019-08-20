import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => (
  <header>
    <h1>iTunes React Demo</h1>
    <nav>
      <div className="row">
        <div className="col-1">
          <NavLink to="/" activeClassName="is-active" className="nav-item" exact={true}>
            Dashboard
          </NavLink>
        </div>
        <div className="col-1">
          <NavLink to="/favorites" activeClassName="is-active" className="nav-item">
            Favorites
          </NavLink>
        </div>
      </div>
    </nav>
  </header>
)

export default Header
