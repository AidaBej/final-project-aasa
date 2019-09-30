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
    isChecked1Bedromm: false,
    isChecked2Bedromm: false,
    isChecked3Bedromm: false,
    isChecked4Bedromm: false,
    isChecked5Bedromm: false,
    others: '',
    isCheckedGarden: false,
    isCheckedFireplace: false,
    isCheckedCaretaker: false,
    isCheckedBalcony: false,
    isCheckedPool: false,
    isCheckedTerrace: false,
    isCheckedParking: false,
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
    else if (filter.price_min && !filter.price_max)
      return prop.budget >= filter.price_min
    else if (!filter.price_min && filter.price_max)
      return prop.budget <= filter.price_max
    else if (filter.price_min && filter.price_max)
      return filter.price_min <= prop.budget && filter.price_max >= prop.budget
  }

  function filterBySize(prop) {
    if (filter.surface_min === '' && filter.surface_max === '')
      return properties
    else if (filter.surface_min && filter.surface_max === '')
      return prop.size >= filter.surface_min
    else if (!filter.surface_min && filter.surface_max)
      return prop.size <= filter.surface_max
    else if (filter.surface_min && filter.surface_max)
      return filter.surface_min <= prop.size && filter.surface_max >= prop.size
  }

  function filterByRooms(prop) {
    if (
      filter.isChecked1Room === '' &&
      filter.isChecked2Room === '' &&
      filter.isChecked3Room === '' &&
      filter.isChecked4Room === '' &&
      filter.isChecked5Room === ''
    )
      return properties
    return (
      (!filter.isChecked1Room || prop.rooms === 1) &&
      (!filter.isChecked2Room || prop.rooms === 2) &&
      (!filter.isChecked3Room || prop.rooms === 3) &&
      (!filter.isChecked4Room || prop.rooms === 4) &&
      (!filter.isChecked5Room || prop.rooms >= 5)
    )
  }

  function filterByBedrooms(prop) {
    if (
      filter.isChecked1Bedromm === '' &&
      filter.isChecked2Bedromm === '' &&
      filter.isChecked3Bedroom === '' &&
      filter.isChecked4Bedroom === '' &&
      filter.isChecked5Bedroom === ''
    )
      return properties
    return (
      (!filter.isChecked1Bedroom || prop.bedrooms === 1) &&
      (!filter.isChecked2Bedroom || prop.bedrooms === 2) &&
      (!filter.isChecked3Bedroom || prop.bedrooms === 3) &&
      (!filter.isChecked4Bedroom || prop.bedrooms === 4) &&
      (!filter.isChecked5Bedroom || prop.bedrooms >= 5)
    )
  }

  function filterByOthers(prop) {
    if (
      filter.isCheckedGarden === '' &&
      filter.isCheckedFireplace === '' &&
      filter.isCheckedCaretaker === '' &&
      filter.isCheckedBalcony === '' &&
      filter.isCheckedPool === '' &&
      filter.isCheckedTerrace === '' &&
      filter.isCheckedParking === ''
    )
      return properties
    return (
      (!filter.isCheckedGarden || prop.others === 'Garden') &&
      (!filter.isCheckedFireplace || prop.others === 'Fireplace') &&
      (!filter.isCheckedCaretaker || prop.others === 'Caretaker') &&
      (!filter.isCheckedBalcony || prop.others === 'Balcony') &&
      (!filter.isCheckedPool || prop.others === 'Swimming Pool') &&
      (!filter.isCheckedTerrace || prop.others === 'Terrace') &&
      (!filter.isCheckedParking || prop.others === 'Parking')
    )
  }

  function getFilteredSales() {
    return properties
      .filter(filterByType)
      .filter(filterByLocation)
      .filter(filterByBudget)
      .filter(filterBySize)
      .filter(filterByRooms)
      .filter(filterByBedrooms)
      .filter(filterByOthers)
  }

  return (
    <div className="Properties-list">
      <h2>Properties for sale</h2>
      {/* <h3>{JSON.stringify(filter)}</h3> */}
      <form
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '50px',
          marginLeft: '20px',
          marginRight: '20px',
          justifyContent: 'space-between',
        }}
      >
        <select
          name="type"
          value={filter.type}
          onChange={handleChange}
          // className="form-control"
          // style={{ width: '30%' }}
        >
          <option value="">To Buy</option>
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
          // className="form-control"
          // style={{ width: '30%' }}
        >
          <option value="">Where ?</option>
          {getLocation().map((sale, i) => (
            <option key={i} value={sale}>
              {sale}
            </option>
          ))}
        </select>
        <span className="title">
          <i className="fi fi-euro"></i>
          Budget
        </span>
        <div className="container_min">
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
            placeholder="min"
            onChange={handleChange}
            autoComplete="off"
            maxLength="13"
          ></input>
          <span className="unit">€</span>
        </div>
        <div className="container_max">
          <input
            type="number"
            name="price_max"
            value={filter.price_max}
            onChange={handleChange}
            placeholder="max"
            autoComplete="off"
            maxLength="13"
          ></input>
          <span className="unit">€</span>
          <br></br>
          {/* <button onClick={handleChange}>OK</button> */}
        </div>
        <span className="title">
          <i className="fi fi-crit-size"></i>
          Size
        </span>
        <span className="description"></span>
        <div className="container_min">
          <input
            type="number"
            name="surface_min"
            value={filter.surface_min}
            onChange={handleChange}
            placeholder="min"
            autoComplete="off"
            maxLength="27"
          ></input>
          <span className="unit">m²</span>
        </div>
        <div className="container_max">
          <input
            type="number"
            name="surface_max"
            value={filter.surface_max}
            onChange={handleChange}
            placeholder="max"
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
            {/* <b-form-group label> */}
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              name="isChecked1Room"
              id="studio"
              checked={filter.isChecked1Room}
              onChange={handleChange}
            ></input>
            <label htmlFor="studio" className="form-check-label">
              Studio
            </label>
          </div>
          <div className="itemList active">
            <input
              type="checkbox"
              name="isChecked2Room"
              id="2rooms"
              checked={filter.isChecked2Room}
              onChange={handleChange}
            ></input>
            <label htmlFor="2rooms">2</label>
          </div>
          <div className="itemList active">
            <input
              type="checkbox"
              name="isChecked3Room"
              id="3rooms"
              checked={filter.isChecked3Room}
              onChange={handleChange}
            ></input>
            <label htmlFor="3rooms">3</label>
          </div>
          <div className="itemList active">
            <input
              type="checkbox"
              name="isChecked4Room"
              id="4rooms"
              checked={filter.isChecked4Room}
              onChange={handleChange}
            ></input>
            <label htmlFor="4rooms">4</label>
          </div>
          <div className="itemList active">
            <input
              type="checkbox"
              name="isChecked5Room"
              id="5andmore"
              checked={filter.isChecked5Room}
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
              className="form-check-input"
              type="checkbox"
              name="isChecked1Bedroom"
              id="1"
              value=""
              onChange={handleChange}
              checked={filter.isChecked1Bedroom}
            ></input>
            <label htmlFor="1">1</label>
          </div>
          <div className="itemList active">
            <input
              className="form-check-input"
              type="checkbox"
              name="isChecked2Bedroom"
              id="2"
              value=""
              onChange={handleChange}
              checked={filter.isChecked2Bedroom}
            ></input>
            <label htmlFor="2">2</label>
          </div>
          <div className="itemList active">
            <input
              className="form-check-input"
              type="checkbox"
              name="isChecked3Bedroom"
              id="3"
              value=""
              onChange={handleChange}
            ></input>
            <label htmlFor="3">3</label>
          </div>
          <div className="itemList active">
            <input
              className="form-check-input"
              type="checkbox"
              name="isChecked4Bedroom"
              id="4"
              value=""
              onChange={handleChange}
            ></input>
            <label htmlFor="4">4</label>
          </div>
          <div className="itemList active">
            <input
              className="form-check-input"
              type="checkbox"
              name="isChecked5Bedroom"
              id="5andmore"
              value=""
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
              className="form-check-input"
              type="checkbox"
              name="isCheckedGarden"
              id="garden"
              value=""
              onChange={handleChange}
              checked={filter.isCheckedGarden}
            ></input>
            <label htmlFor="garden">
              <i className="fi fi-garden"></i>Garden
            </label>
          </div>
          <div className="itemList active">
            <input
              className="form-check-input"
              type="checkbox"
              name="isCheckedFireplace"
              id="fireplace"
              value=""
              onChange={handleChange}
              checked={filter.isCheckedFireplace}
            ></input>
            <label htmlFor="fireplace">
              <i className="fi fi-crit-chimney"></i>Fireplace
            </label>
          </div>
          <div className="itemList active">
            <input
              className="form-check-input"
              type="checkbox"
              name="isCheckedCaretaker"
              id="guardian"
              value=""
              onChange={handleChange}
              checked={filter.isCheckedCaretaker}
            ></input>
            <label htmlFor="guardian">
              <i className="fi fi-crit-man-suit"></i>Caretaker
            </label>
          </div>
          <div className="itemList active">
            <input
              className="form-check-input"
              type="checkbox"
              name="isCheckedBalcony"
              id="balcony"
              value=""
              onChange={handleChange}
              checked={filter.isCheckedBalcony}
            ></input>
            <label htmlFor="balcony">
              <i className="fi fi-crit-balcony"></i>Balcony
            </label>
          </div>
          <div className="itemList active">
            <input
              className="form-check-input"
              type="checkbox"
              name="isCheckedPool"
              id="pool"
              value=""
              onChange={handleChange}
              checked={filter.isCheckedPool}
            ></input>
            <label htmlFor="Swimming-Pool">
              <i className="fi fi-crit-swimming-pool"></i>Swimming Pool
            </label>
          </div>

          <div className="itemList active">
            <input
              className="form-check-input"
              type="checkbox"
              name="isCheckedTerrace"
              id="terrace"
              value=""
              onChange={handleChange}
              checked={filter.isCheckedTerrace}
            ></input>
            <label htmlFor="terrace">
              <i className="fi fi-crit-table"></i>Terrace
            </label>
          </div>
          <div className="itemList active">
            <input
              className="form-check-input"
              type="checkbox"
              name="isCheckedParking"
              id="parking"
              value=""
              onChange={handleChange}
              checked={filter.isCheckedParking}
            ></input>
            <label htmlFor="parking">
              <i></i>Parking
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
              style={{ width: '30%' }}
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
