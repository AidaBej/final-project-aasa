import React, { useEffect, useState } from 'react'
import api from '../../api'
import { Link } from 'react-router-dom'
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
// import AwsSliderStyles from 'react-awesome-slider/src/styles';

export default function ForRent() {

  // const [slick, setSlick] = useState({
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1
  // })

  const slider = (
    <AwesomeSlider>
      <div data-src="/path/to/image-0.png" />
      <div data-src="/path/to/image-1.png" />
      <div data-src="/path/to/image-2.jpg" />
    </AwesomeSlider>
  );

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
    <div className="properties">
      {/* <nav> */}
      <h2>Properties to rent</h2>

      <div className="select-options">
        <select
          name="type"
          value={filter.type}
          onChange={handleChange}
          className="form-control property-type"
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
          className="form-control property-location"
          style={{ width: '30%' }}
        >
          <option value="">Location</option>
          {getLocation().map((sale, i) => (
            <option key={i} value={sale}>
              {sale}
            </option>
          ))}
        </select>
      </div>
      {/* </nav> */}
      <br />

      {
        getFilteredSales().map((property, i) => (
          <div key={i}>

            <div className="property-card">
              <div key={property._id}>
                {/* <div key={property._id} className=""> */}
                {/* <li> */}
                <Link to={`/detail/${property._id}`}>
                  <h3 className="card-title">{property.title} in {property.location}</h3>
                </Link>
                <AwesomeSlider className="pictures-list slideshow-container">
                  {
                    property.pictures.map((pic, i) => (
                      <div key={i} data-src={pic} alt={property.title + ' photo ' + (i + 1)} className="imgs" />
                      // <img key={i} src={pic} alt={property.title + ' photo ' + (i + 1)} className="imgs" />

                    ))
                  }
                </AwesomeSlider>
                {/* </li> */}
              </div>

              <div className="property-details">
                <p>{property.budget}€ per month</p>
                <p>{property.rooms} rooms || {property.bedrooms} bedrooms || {property.size} m²</p>
              </div>
            </div>
          </div>
        ))}

    </div >
  )
}


{/* <ul className="pictures-list slideshow-container">
                      {
                        property.pictures.map((pic, i) => (
                          <li key={i}>
                            <img src={pic} alt={property.title + ' photo ' + (i + 1)} className="imgs" />
                          </li>
                        ))
                      }
                    </ul> */}
