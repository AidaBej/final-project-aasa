import React, { useState } from 'react'
import api from '../../api'
import { useForm } from '../../hooks'
import { Link } from 'react-router-dom'

export default function Login(props) {
  const { formValues, getInputProps } = useForm({ email: '', password: '' })

  function handleSubmit(e) {
    e.preventDefault()
    api
      .login(formValues.email, formValues.password)
      .then(result => {
        console.log('SUCCESS!')
        props.history.push('/') // Redirect to the home page
      })
      .catch(err => setMessage(err.toString()))
  }

  const [message, setMessage] = useState(null)

  return (
    <div className="login">
      <div className="square-contact">
        <div className="opacity-low-contact"></div>
        <div className="bloc-contact">
          <div className="ContactUs">
            <h2 className="contact-title">Login</h2>
            <form className="form-generic" onSubmit={handleSubmit}>
              <div className="form-group">
                <label for="InputEmail">Email</label>
                <input
                  name="email"
                  // style={{ width: '20%' }}
                  value={formValues.email}
                  type="text"
                  {...getInputProps('email')}
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label for="InputPassword">Password</label>
                <input
                  name="password"
                  type="password"
                  {...getInputProps('password')}
                  className="form-control"
                  placeholder="*********"
                />
              </div>
              <div class="button-submit-contact">
                <button
                  type="submit"
                  class="btn btn-primary"
                  // onClick={e => handleClick(e)}
                >
                  Login
                </button>{' '}
              </div>
            </form>
            <small>
              Don't have an account yet ?
              <Link className="" to="/signup">
                Sign Up
              </Link>
            </small>
            <br />
            <div className="background-image-login"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
