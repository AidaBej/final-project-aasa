import React, { useEffect, useState } from 'react'
import api from '../../api'
import { Link } from 'react-router-dom'

export default function ForRent() {
  const [filter, setFilter] = useState({
    type: '',
    location: '',
    budget: '',
    size: '',
    rooms: '',
    bedrooms: '',
    others: '',
  })

  const [properties, setProperties] = useState([])

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
      .getForRent()
      .then(properties => {
        setProperties(properties)
      })
      .catch(err => console.log(err))
  }, [])
  function handleChange(e) {
    setFilter({ ...filter, [e.target.name]: e.target.value })
  }
  function getFilteredSales() {
    if (
      filter.type === '' &&
      filter.location === ''
      // &&
      // filter.budget === '' &&
      // filter.size === '' &&
      // filter.rooms === '' &&
      // filter.bedrooms === '' &&
      // filter.others === ''
    )
      return properties
    return properties.filter(sale => {
      if (filter.location === '') return sale.type === filter.type
      if (filter.type === '') return sale.location === filter.location
      return sale.type === filter.type && sale.location === filter.location
    })
  }
  // console.log(getLocation())

  return (
    <div className="Properties">
      <nav>
        <h2>Properties for rent</h2>

        <select
          name="type"
          value={filter.type}
          onChange={handleChange}
          className="form-control"
          style={{ width: '30%' }}
        >
          <option value="">--To rent--</option>
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
      </nav>
      <br />
      <br />
      <br />
      {getFilteredSales().map((rent, i) => (
        <div key={i} className="img-card">
          <p>
            <ul key={rent._id}>
              <img
                src={rent.pictures[0]}
                alt={rent.title}
                className="property-imgs"
              />
              <li>
                <Link to={rent.singleproperty} className="property">
                  {rent.title}
                </Link>
              </li>
              <li>
                <strong>{rent.budget}€</strong>
              </li>
              <li>
                <strong>
                  {rent.type} {rent.kind}
                </strong>
              </li>
              <li>
                {rent.rooms} rooms || {rent.bedrooms} bedrooms || {rent.size} m²
              </li>
              <li>{rent.location}</li>
            </ul>
          </p>
        </div>
      ))}
    </div>
  )
}
