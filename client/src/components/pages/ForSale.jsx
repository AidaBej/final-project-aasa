import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'

export default function ForSale() {
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
      .getProperties()
      .then(res => setProperties(res))
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
  console.log(getLocation())
  return (
    <div className="Properties-list">
      <nav>
        <h2>Properties for sale</h2>

        {/* <h3>{JSON.stringify(filter)}</h3> */}
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
      </nav>{' '}
      <br />
      <br />
      <br />
      {getFilteredSales().map((sale, i) => (
        <div key={i}>
          <p>
            <ul key={sale._id}>
              <img
                src={sale.pictures[0]}
                alt={sale.title}
                className="property-imgs"
              />
              <li>
                <Link to={sale.singleproperty} className="property">
                  {sale.title}
                </Link>
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
          </p>
        </div>
      ))}
    </div>
  )
}
