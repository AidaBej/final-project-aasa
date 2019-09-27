import React, { useEffect, useState } from 'react'
import api from '../../api'
import { Link } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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

  // function getImages() {
  //   return properties.map(property => property.pictures)
  // }

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
    <div className="properties">
      <nav>
        <h2>Properties for rent</h2>

        <select
          name="type"
          value={filter.type}
          onChange={handleChange}
          className="form-control"
          style={{ width: '30%' }}
        >
          <option value="">Types of properties to rent</option>
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
          <option value="">Location</option>
          {getLocation().map((sale, i) => (
            <option key={i} value={sale}>
              {sale}
            </option>
          ))}
        </select>
      </nav>
      <br />
      {/* <br />
      <br /> */}
      {getFilteredSales().map((property, i) => (
        <div key={i}>
          <Link to={`/detail/${property._id}`}>
            <ul key={property._id} className="property-card">
              <li>

                <ul className="pictures-list slideshow-container">
                  {
                    property.pictures.map((pic, i) => (
                      <li key={i}>
                        <img src={pic} alt={property.title + ' photo ' + (i + 1)} className="imgs" />
                      </li>
                    ))
                  }
                </ul>

              </li>
              <li><strong>{property.title}</strong></li>
              {/* <Link to={property.singleproperty} className="property-details">
              </Link> */}
              <li><strong>{property.budget}€</strong></li>
              <li>{property.type} {property.kind}</li>
              <li>{property.rooms} rooms || {property.bedrooms} bedrooms || {property.size} m²</li>
              <li>{property.location}</li>
            </ul>
          </Link>

        </div>
      ))}

    </div>
  )
}
