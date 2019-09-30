import React, { useState } from 'react'
import api from '../../api'

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
        console.log('SUCCESS!')
        props.history.push('/') // Redirect to the home page
      })
      .catch(err => setState({ message: err.toString() }))
  }
  return (
    <div className="Signup">
      {/* <div className="square-contact">
        <div className="opacity-low-contact">
        <div className="bloc-contact">
          <div className="ContactUs"> */}
      <h2 className="contact-title">Signup</h2>
      <form onSubmit={handleClick} onChange={handleInputChange}>
        <div className="form-group">
          <label for="InputName">Name</label>
          <input
            type="text"
            name="name"
            value={state.name}
            className="form-control"
            placeholder="Enter your name"
          />
        </div>
        <div class="form-group">
          <label for="InputEmail">Email</label>
          <input
            id="InputEmail"
            name="email"
            value={state.email}
            type="email"
            className="form-control"
            placeholder="email@example.com"
          />
        </div>
        <div class="form-group">
          <label for="InputPassword">Password</label>
          <input
            name="password"
            value={state.password}
            type="password"
            className="form-control"
            placeholder="*****"
          />
        </div>
        <div class="button-submit-contact">
          <button
            type="submit"
            class="btn btn-primary"
            onClick={e => handleClick(e)}
          >
            Signup
          </button>
        </div>
      </form>
      <br />

      <div className="background-image-signup"></div>
      {/* </div>
        </div>
      </div> */}
    </div>
  )
}
