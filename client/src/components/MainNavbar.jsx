import React, { useState } from 'react'
import api from '../api'
// import logo from '../logo.svg'
import { Link, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'


function MainNavbar(props) {
  api.isAdmin()

  function handleLogoutClick(e) {
    api.logout()
  }
  const [shown, setShown] = useState(false)
  return (
    <nav className="navbar navbar-expand-sm navbar-dark position-fixed mb-4">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      {/* <img src="./../images/WealthySameDoe.webp" className="App-logo" alt="logo" /> */}
      <img
        src="https://res.cloudinary.com/drukuybdj/image/upload/v1569850095/ironhack-project-3/properties/logo_xgzym8.gif"
        className="App-logo"
        alt="logo"
      />
      <Link className="navbar-brand" to="/">
        Parisian Cocoon{' '}
      </Link>

      {/* <li className="nav-item">
        <NavLink className="nav-link" to="/">
          Parisian Cocoon{' '}
        </NavLink>
      </li> */}

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

          {/* <li className="nav-item">
            <NavLink className="nav-link" to="/aboutus">
              About us{' '}
            </NavLink>
          </li>*/}

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
          {api.isAdmin() && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/add-new-property">
                Add New
              </NavLink>
            </li>
          )}
          {api.isAdmin() && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/manage-property">
                Edit
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
          {/* {api.isLoggedIn() && (
            <li className="nav-item">
              <Link className="nav-link" to="/favorites">
                <i className="fav fas fa-heart red"></i>
              </Link>
            </li>
          )} */}
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(MainNavbar)
