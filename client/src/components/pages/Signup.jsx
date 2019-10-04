import React, { useState } from 'react'
import api from '../../api'
import { Link } from 'react-router-dom'

export default function Signup(props) {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    message: null,
  })

  function handleInputChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  function handleClick(e) {
    e.preventDefault()
    console.log(state)
    let data = {
      name: state.name,
      email: state.email,
      password: state.password,
    }
    api
      .signup(data)
      .then(result => {
        // console.log('SUCCESS!')
        console.log(result)
        props.history.push('/') // Redirect to the home page
      })
      .catch(err => setState({ message: err.toString() }))
  }
  return (
    <div className="signup">
      <div className="square-contact">
        <div className="opacity-low-contact"></div>
        <div className="bloc-contact">
          <div className="ContactUs">
            <h2 className="contact-title">Signup</h2>
            <form
              className="form-generic"
              onSubmit={handleClick}
              onChange={handleInputChange}
            >
              <div className="form-group">
                <label for="InputName">Name </label>
                <input
                  type="text"
                  name="name"
                  value={state.name}
                  className="form-control"
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group">
                <label for="InputEmail">Email </label>
                <input
                  id="InputEmail"
                  name="email"
                  value={state.email}
                  type="email"
                  className="form-control"
                  placeholder="email@example.com"
                />
              </div>
              <div className="form-group">
                <label for="InputPassword">Password</label>
                <input
                  name="password"
                  value={state.password}
                  type="password"
                  className="form-control"
                  placeholder="*****"
                />
              </div>
              <div className="button-submit-contact">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={e => handleClick(e)}
                >
                  Signup
                </button>
              </div>
            </form>
            <small>
              Already have an account ? <Link to="/login">Sign In</Link>
            </small>
            <br />

            <div className="background-image-signup"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
