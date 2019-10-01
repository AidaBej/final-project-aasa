import React, { useState } from 'react'
import api from '../../api'

export default function AddProperty(props) {
  const [state, setState] = useState({
    title: '',
    type: '',
    king: '',
    location: '',
    localisation: '',
    budget: '',
    size: '',
    rooms: '',
    bedrooms: '',
    others: '',
    description: '',
    pictures: '',
  })
  const [message, setMessage] = useState(null)

  console.log(state)

  function handleInputChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  function handleClick(e) {
    e.preventDefault()
    console.log(state.name, state.description)
    let data = {
      title: state.title,
      type: state.type,
      kind: state.kind,
      location: state.location,
      localisation: state.localisation,
      budget: state.budget,
      size: state.size,
      rooms: state.rooms,
      bedrooms: state.bedrooms,
      others: state.others,
      description: state.description,
      pictures: state.pictures,
    }
    api
      .addCountry(data)
      .then(result => {
        console.log('SUCCESS!')
        setState({
          name: '',
          capitals: '',
          area: '',
          description: '',
        })
        setMessage(`Your country '${state.name}' has been created`)
        setTimeout(() => {
          setMessage(null)
        }, 2000)
      })
      .catch(err => setState({ message: err.toString() }))
  }
  return (
    <div className="AddCountry">
      <h2>Add country</h2>
      <form>
        Name:{' '}
        <input
          type="text"
          value={state.name}
          name="name"
          onChange={handleInputChange}
        />{' '}
        <br />
        Capitals:{' '}
        <input
          type="text"
          value={state.capitals}
          name="capitals"
          onChange={handleInputChange}
        />{' '}
        <br />
        Area:{' '}
        <input
          type="number"
          value={state.area}
          name="area"
          onChange={handleInputChange}
        />{' '}
        <br />
        Description:{' '}
        <textarea
          value={state.description}
          name="description"
          cols="30"
          rows="10"
          onChange={handleInputChange}
        />{' '}
        <br />
        <button onClick={e => handleClick(e)}>Create country</button>
      </form>
      {message && <div className="info">{message}</div>}
    </div>
  )
}
