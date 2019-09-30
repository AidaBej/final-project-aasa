import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'

export default function ForSale() {
  const [filter, setFilter] = useState({
    type: '',
    location: '',
    budget: '',
    price_min: '',
    price_max: '',
    size: '',
    surface_min: '',
    surface_max: '',
    rooms: '',
    isChecked1Room: false,
    isChecked2Room: false,
    isChecked3Room: false,
    isChecked4Room: false,
    isChecked5Room: false,
    bedrooms: '',
    others: '',
  })

  const [properties, setProperties] = useState([])

  //Pour récupérer toutes les location des propriétés et les mettre ensuite dans le select
  function getLocation() {
    return properties
      .map(property => property.location)
      .filter((location, i, locations) => {
        return locations.indexOf(location) === i
      })
      .sort()
  }

  useEffect(() => {
    api
      .getProperties()
      .then(res => setProperties(res))
      .catch(err => console.log(err))
  }, [])

  function handleChange(e) {
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFilter({ ...filter, [e.target.name]: value })
  }

  function filterByType(prop) {
    if (filter.type === '') return properties
    return prop.type === filter.type
  }
  function filterByLocation(prop) {
    if (filter.location === '') return properties
    return prop.location === filter.location
  }

  function filterByBudget(prop) {
    if (filter.price_min === '' && filter.price_max === '') return properties
    else if (filter.price_min && filter.price_max === '')
      return prop.budget >= filter.price_min
    else if (!filter.price_min && filter.price_max)
      return prop.budget <= filter.price_max
    else if (filter.price_min && filter.price_max)
      return filter.price_min >= prop.budget && filter.price_min <= prop.budget
    // if (filter.price_max >= prop.budget)
    //   return filter.budget === filter.price_max
    // if (filter.price_min <= prop.budget && filter.price_max >= prop.budget)
    //   return filter.budget
  }

  function filterBySize() {}

  function filterByRooms() {
    if (
      !filter.isChecked1Room &&
      !filter.isChecked2Room &&
      !filter.isChecked3Room &&
      !filter.isChecked4Room &&
      !filter.isChecked5Room
    )
      return properties
    return (
      (!filter.isChecked1Room || filter.rooms === 'Studio') &&
      (!filter.isChecked2Room || filter.rooms === '2') &&
      (!filter.isChecked3Room || filter.rooms === '3') &&
      (!filter.isChecked4Room || filter.rooms === '4') &&
      (!filter.isChecked5Room || filter.rooms >= '5')
    )
  }

  function filterByBedrooms() {}

  function filterByOthers() {}

  function getFilteredSales() {
    return properties
      .filter(filterByType)
      .filter(filterByLocation)
      .filter(filterByBudget)
      .filter(filterByRooms)
  }

  return (
    <div className="Properties-list">
      <h2>Properties for sale</h2>
      {/* <h3>{JSON.stringify(filter)}</h3> */}
      <form>
        <select
          name="type"
          value={filter.type}
          onChange={handleChange}
          className="form-control"
          style={{ width: '30%' }}
        >
          <option value="">--To Buy--</option>
          <option value="Apartment">Apartment</option>
          <option value="Loft">Loft</option>
          <option value="Duplex">Duplex</option>
          <option value="Triplex">Triplex</option>
          <option value="Penthouse">Penthouse</option>
          <option value="Houseboat">Houseboat</option>
        </select>

        <select
          name="location"
          value={filter.location}
          onChange={handleChange}
          className="form-control"
          style={{ width: '30%' }}
        >
          <option value="">--Where ?--</option>
          {getLocation().map((sale, i) => (
            <option key={i} value={sale}>
              {sale}
            </option>
          ))}
        </select>
        <span className="title">
          <i className="fi fi-euro"></i>
          --Budget--
        </span>
        <div className="container_min">
          <label>Min</label>
          {/* <input
            type="range"
            min="0"
            name="price_min"
            value={filter.price_min}
            onChange={handleChange}
            max="100000000000"
            step="10000"
            oninput="result4.value=parseInt(d.value)"
          ></input> */}
          <input
            min={0}
            type="number"
            name="price_min"
            value={filter.price_min}
            placeholder=""
            onChange={handleChange}
            autoComplete="off"
            maxLength="13"
          ></input>
          <span className="unit">€</span>
        </div>
        <div className="container_max">
          <label>Max</label>
          <input
            type="number"
            name="price_max"
            value={filter.price_max}
            onChange={handleChange}
            placeholder=""
            autoComplete="off"
            maxLength="13"
          ></input>
          <span className="unit">€</span>
          <button onClick={handleChange}>OK</button>
        </div>
        <span className="title">
          <i className="fi fi-crit-size"></i>
          --Size--
        </span>
        <span className="description"></span>
        <div className="container_min">
          <label>Min</label>
          <input
            type="number"
            name="surface_min"
            value=""
            placeholder=""
            autoComplete="off"
            maxLength="27"
          ></input>
          <span className="unit">m²</span>
        </div>
        <div className="container_max">
          <label>Max</label>
          <input
            type="number"
            name="surface_max"
            value=""
            placeholder=""
            autoComplete="off"
            maxLength="27"
          ></input>
          <span className="unit">m²</span>
        </div>
        <span className="error invisible"></span>

        <span className="title">
          <i className="fi fi-crit-room"></i>How many rooms ?
        </span>
        <span className="description"></span>
        <div className="containerList">
          <div className="itemList active">
            <input
              type="checkbox"
              name="1rooms"
              id="studio"
              value="1"
              // checked={filter.isChecked1Room}
              onChange={handleChange}
            ></input>
            <label htmlFor="studio">Studio</label>
          </div>
          <div className="itemList active">
            <input
              type="checkbox"
              name="2rooms"
              id="2rooms"
              value="2"
              onChange={handleChange}
            ></input>
            <label htmlFor="2rooms">2</label>
          </div>
          <div className="itemList active">
            <input
              type="checkbox"
              name="3rooms"
              id="3rooms"
              value="3"
              onChange={handleChange}
            ></input>
            <label htmlFor="3rooms">3</label>
          </div>
          <div className="itemList active">
            <input
              type="checkbox"
              name="4rooms"
              id="4rooms"
              value="4"
              checked=""
              onChange={handleChange}
            ></input>
            <label htmlFor="4rooms">4</label>
          </div>
          <div className="itemList active">
            <input
              type="checkbox"
              name="5rooms"
              id="5andmore"
              value="5"
              onChange={handleChange}
            ></input>
            <label htmlFor="5andmore">5+</label>
          </div>
        </div>
        <span className="error invisible"></span>
        <span className="title">
          <i className="fi fi-crit-room"></i>How many bedrooms ?
        </span>
        <span className="description"></span>
        <div className="containerList">
          <div className="itemList active">
            <input
              type="checkbox"
              name="bedrooms"
              id="1"
              value="1"
              onChange={handleChange}
            ></input>
            <label htmlFor="1">1</label>
          </div>
          <div className="itemList active">
            <input
              type="checkbox"
              name="bedrooms"
              id="2"
              value="2"
              onChange={handleChange}
            ></input>
            <label htmlFor="2">2</label>
          </div>
          <div className="itemList active">
            <input
              type="checkbox"
              name="bedrooms"
              id="3"
              value="3"
              onChange={handleChange}
            ></input>
            <label htmlFor="3">3</label>
          </div>
          <div className="itemList active">
            <input
              type="checkbox"
              name="bedrooms"
              id="4"
              value="4"
              onChange={handleChange}
            ></input>
            <label htmlFor="4">4</label>
          </div>
          <div className="itemList active">
            <input
              type="checkbox"
              name="bedrooms"
              id="5andmore"
              value="5"
              onChange={handleChange}
            ></input>
            <label htmlFor="5andmore">5+</label>
          </div>
        </div>
        <span className="error invisible"></span>
        <span className="title">
          <i className="fi fi-heart"></i> Other criterias
        </span>
        <span className="description"></span>
        <div className="containerList">
          <div className="itemList active">
            <input
              type="checkbox"
              name="shortcuts"
              id="garden"
              value="garden"
              onChange={handleChange}
            ></input>
            <label htmlFor="garden">
              <i className="fi fi-garden"></i>Garden
            </label>
          </div>
          <div className="itemList active">
            <input
              type="checkbox"
              name="shortcuts"
              id="hearth"
              value="hearth"
              onChange={handleChange}
            ></input>
            <label htmlFor="hearth">
              <i className="fi fi-crit-chimney"></i>Fireplace
            </label>
          </div>
          <div className="itemList active">
            <input
              type="checkbox"
              name="shortcuts"
              id="guardian"
              value="guardian"
              onChange={handleChange}
            ></input>
            <label htmlFor="guardian">
              <i className="fi fi-crit-man-suit"></i>Caretaker
            </label>
          </div>
          <div className="itemList active">
            <input
              type="checkbox"
              name="shortcuts"
              id="balcony"
              value="balcony"
              onChange={handleChange}
            ></input>
            <label htmlFor="balcony">
              <i className="fi fi-crit-balcony"></i>Balcony
            </label>
          </div>
          <div className="itemList active">
            <input
              type="checkbox"
              name="shortcuts"
              id="pool"
              value="pool"
              onChange={handleChange}
            ></input>
            <label htmlFor="Swimming-Pool">
              <i className="fi fi-crit-swimming-pool"></i>Swimming Pool
            </label>
          </div>

          <div className="itemList active">
            <input
              type="checkbox"
              name="shortcuts"
              id="terrace"
              value="terrace"
              onChange={handleChange}
            ></input>
            <label htmlFor="terrace">
              <i className="fi fi-crit-table"></i>Terrace
            </label>
          </div>
        </div>
        <span className="error invisible"></span>
      </form>{' '}
      <br />
      <br />
      <br />
      {getFilteredSales().map((sale, i) => (
        <div key={i}>
          <ul key={sale._id}>
            {api.isLoggedIn() && (
              <i className="fav fas fa-heart white" data-id="{{this._id}}"></i>
            )}
            <img
              src={sale.pictures[0]}
              alt={sale.title}
              className="property-imgs"
            />
            <li>
              {/* <Link to={sale.singleproperty} className="property">
                {sale.title}
              </Link> */}
            </li>
            <li>
              <strong>{sale.budget}€</strong>
            </li>
            <li>
              <strong>
                {sale.type} {sale.kind}
              </strong>
            </li>
            <li>
              {sale.rooms} rooms || {sale.bedrooms} bedrooms || {sale.size} m²
            </li>
            <li>{sale.location}</li>
          </ul>
        </div>
      ))}
    </div>
  )
}
