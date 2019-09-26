import React, { useState } from 'react'
import api from '../../api'

export default function ContactUs(props) {
  const [state, setState] = useState({
    name: null,
    email: '',
    message: null,
    topic: null,
  })

  function handleInputChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  function handleClick(e) {
    e.preventDefault()
    console.log('clicked')
    let data = {
      name: state.name,
      email: state.email,
      topic: state.topic,
      message: state.message,
    }
    api
      .contactUs(data)
      .then(result => {
        console.log('SUCCESS!')
        props.history.push('/') // Redirect to the home page
      })
      .catch(err => setState({ message: err.toString() }))
  }

  return (
    <div className="ContactUs">
      <h2>Contact us</h2>
      <form onSubmit={handleClick} onChange={handleInputChange}>
        <div class="form-group">
          <label for="InputName">Name</label>
          <input
            name="name"
            value={state.name}
            type="name"
            className="form-control"
            placeholder="Enter your name"
          />
        </div>
        <div class="form-group">
          <label for="InputEmail">Email</label>
          <input
            name="email"
            style={{ width: '20%' }}
            value={state.email}
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div class="form-group">
          <label for="FormControlSelect1">Topic</label>
          <select name="topic" class="form-control" style={{ width: '20%' }}>
            <option>Alerts</option>
            <option>Real estate search</option>
            <option>Website technical trouble</option>
            <option>To say you're awesome</option>

            <option>Others</option>
          </select>
        </div>

        <div class="form-group">
          <label for="InputMessage">Message</label>
          <textarea
            name="message"
            style={{ width: '40%' }}
            value={state.message}
            type="text"
            className="form-control"
            placeholder="Enter your message"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
      <br></br>
    </div>
  )
}
