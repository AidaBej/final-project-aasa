import React, { useState } from 'react'
import api from '../api'
// import logo from '../logo.svg'
import { Link, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'

function MainNavbar(props) {
  function handleLogoutClick(e) {
    api.logout()
  }
  const [shown, setShown] = useState(false)
  return (
    <nav className="navbar navbar-expand-sm navbar-dark  mb-4">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <img src="WealthySameDoe.webp" className="App-logo" alt="logo" />
      <Link className="navbar-brand" to="/">
        Parisian Cocoon{' '}
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={() => setShown(!shown)}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className={'collapse navbar-collapse' + (shown ? ' show' : '')}
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/forsale">
              For Sale
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/forrent">
              For Rent
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/contactus">
              Contact us{' '}
            </NavLink>
          </li>

          {api.isLoggedIn() && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/favorites">
                Favorites{' '}
              </NavLink>
            </li>
          )}

          {!api.isLoggedIn() && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/signup">
                Signup
              </NavLink>
            </li>
          )}
          {!api.isLoggedIn() && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
          )}
          {api.isLoggedIn() && (
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleLogoutClick}>
                Logout
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(MainNavbar)
