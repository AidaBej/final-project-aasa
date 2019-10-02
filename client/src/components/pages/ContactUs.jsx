import React, { useState, useEffect } from 'react'
import api from '../../api'

export default function ContactUs(props) {
  console.log(props)
  const [state, setState] = useState({
    name: null,
    email: '',
    message: null,
    topic: null,
  })
  useEffect(() => {
    console.log('contact us props =>>', props)
  }, [])
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
        console.log(props.history)

        props.history.push('/') // Redirect to the home page
      })
      .catch(err => setState({ message: err.toString() }))
  }

  return (
    <div className="contact">
      <div className="square-contact">
        <div className="opacity-low-contact"></div>
        <div className="bloc-contact">
          <div className="ContactUs">
            <h2 className="contact-title">CONTACT US</h2>
            <form
              className="form-generic"
              onSubmit={handleClick}
              onChange={handleInputChange}
            >
              <div className="form-group">
                <label for="InputName">Name</label>
                <input
                  name="name"
                  value={state.name}
                  type="name"
                  className="form-control"
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group">
                <label for="InputEmail">Email</label>
                <input
                  name="email"
                  // style={{ width: '20%' }}
                  value={state.email}
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>

              <div className="form-group">
                <label for="FormControlSelect1">Topic</label>
                <select
                  name="topic"
                  className="form-control"
                  // style={{ width: '20%' }}
                >
                  <option value="">Select</option>
                  <option value="Alerts">Alerts</option>
                  <option value="Real estate search">Real estate search</option>
                  <option value="Website technical trouble">
                    Website technical trouble
                  </option>
                  <option value="To say you're awesome">
                    To say you're awesome
                  </option>

                  <option>Others</option>
                </select>
              </div>

              <div className="form-group-msg">
                <label for="InputMessage">Message</label>
                <textarea
                  name="message"
                  // style={{ width: '40%' }}
                  value={state.message}
                  type="text"
                  className="form-control"
                  placeholder="Enter your message"
                />
              </div>

              {/* <div className="button-submit-contact"> */}
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              {/* <div
                class="alert alert-warning alert-dismissible fade show"
                role="alert"
              >
                <strong>Thank you !</strong> Your message has been sent
                succefully.
                <button
                  type="button"
                  class="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div> */}
              {/* </div> */}
            </form>
            <br></br>

            <div className="background-image-contact"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
