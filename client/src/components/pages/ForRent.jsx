import React, { useEffect, useState } from 'react'
import api from '../../api'
import { Link } from 'react-router-dom'
import AwesomeSlider from 'react-awesome-slider'
import 'react-awesome-slider/dist/styles.css'

// import AwsSliderStyles from 'react-awesome-slider/src/styles';

export default function ForRent() {
  const [filter, setFilter] = useState({
    type: '',
    location: '',
    budget: '',
    price_min: '',
    price_max: '',
    size: '',
    surface_min: '',
    surface_max: '',
    nbRooms: [],
    nbBedrooms: [],
    others: [],
  })

  const [properties, setProperties] = useState([])

  const [filteredProperties, setFilteredProperties] = useState([])

  //Pour récupérer toutes les location des propriétés et les mettre ensuite dans le select
  function getLocation() {
    return properties
      .map(property => property.location)
      .filter((location, i, locations) => {
        return locations.indexOf(location) === i
      })
      .sort()
  }

  function isEmptyFilter(f) {
    var res = false
    for (let prop in f) {
      res = Array.isArray(f[prop]) ? Boolean(f[prop].length) : Boolean(f[prop])
      if (res) break
    }
    return res === false
  }

  useEffect(() => {
    // utilise base data pour mettre à jour filtered data
    // la liste des properties reste tjs complète
    // on applique un filtre et utilise le tableau retourné pour mettre à jour filteredProperties

    if (isEmptyFilter(filter)) {
      console.log('***** EMPTY ******')
      setFilteredProperties(properties)
    } else {
      console.log('***** NOT EMPTY ******')
      setFilteredProperties(getFilteredSales())
    }
  }, [filter])

  useEffect(() => {
    api
      .getProperties('/forrent')
      .then(res => {
        setProperties(res) // base data
        setFilteredProperties(res) // copy of base data
      })
      .catch(err => console.log(err))
  }, [])

  function getGoogleMapsDirection(property) {
    let [lng, lat] = property.localisation.coordinates
    return `https://www.google.com/maps/dir//${lat},${lng}/@${lat},${lng},15z`
  }

  function handleChange(e) {
    if (e.target.type === 'checkbox') {
      const copy = filter[e.target.name]
      if (e.target.checked) {
        copy.push(
          e.target.name !== 'others' ? Number(e.target.value) : e.target.value
        )
      } else {
        copy.splice(copy.indexOf(e.target.value), 1)
      }

      setFilter({ ...filter, [e.target.name]: copy })
    } else setFilter({ ...filter, [e.target.name]: e.target.value })
  }

  function filterByType(prop) {
    // console.log(prop.type === filter.type)
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
    if (!filter.nbRooms.length) return true
    if (filter.nbRooms < 5) return filter.nbRooms.includes(prop.rooms)
    else return filter.nbRooms.includes(prop.rooms) || prop.rooms > 5
  }

  function filterByBedrooms(prop) {
    if (!filter.nbBedrooms.length) return true
    if (filter.nbBedrooms < 5) return filter.nbBedrooms.includes(prop.bedrooms)
    else return filter.nbBedrooms.includes(prop.bedrooms) || prop.bedrooms > 5
  }

  function filterByOthers(prop) {
    if (!filter.others.length) return true
    var tmp = []

    filter.others.forEach(criteria => {
      tmp.push(prop.others.includes(criteria))
    })

    return (
      tmp.reduce((acc, val, i) => {
        const inc = Number(val)
        return (acc += inc)
      }, 0) >= 1
    )
  }

  function getFilteredSales() {
    // console.log('------- all properties ---------')
    // console.log(properties)
    console.log(properties.filter(filterByOthers))
    // console.log('---------------------------------')
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
    <div className="properties">
      <h2>Properties for rent</h2>
      {/* <h3>{JSON.stringify(filter)}</h3> */}
      <div className="filters">
        <form className="form-filters" onChange={handleChange}>
          <div className="filter-block">
            <select
              name="type"
              value={filter.type}
              onChange={handleChange}
              className="dropdowns"
              // style={{ width: '30%' }}
            >
              <option value="">Types of properties</option>
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
              className="dropdowns"
              // style={{ width: '30%' }}
            >
              <option value="">Location</option>
              {getLocation().map((sale, i) => (
                <option key={i} value={sale}>
                  {sale}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-block">
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
                className="input-min-max"
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
                className="input-min-max"
              ></input>
              <span className="unit">€</span>
              <br></br>
              {/* <button onClick={handleChange}>OK</button> */}
            </div>
          </div>

          <div className="filter-block">
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
                className="input-min-max"
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
                className="input-min-max"
              ></input>
              <span className="unit">m²</span>
            </div>
            <span className="error invisible"></span>
          </div>

          <div className="filter-block">
            <span className="title">
              <i className="fi fi-crit-room"></i>Rooms
            </span>
            <span className="description"></span>
            <div className="containerList">
              <div className="itemList active">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="1"
                  name="nbRooms"
                ></input>
                <label htmlFor="studio" className="filter-label">
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
                <label htmlFor="2rooms" className="filter-label">
                  2
                </label>
              </div>
              <div className="itemList active">
                <input
                  type="checkbox"
                  name="isChecked3Room"
                  id="3rooms"
                  checked={filter.isChecked3Room}
                  onChange={handleChange}
                ></input>
                <label htmlFor="3rooms" className="filter-label">
                  3
                </label>
              </div>
              <div className="itemList active">
                <input
                  type="checkbox"
                  name="isChecked4Room"
                  id="4rooms"
                  checked={filter.isChecked4Room}
                  onChange={handleChange}
                ></input>
                <label htmlFor="4rooms" className="filter-label">
                  4
                </label>
              </div>
              <div className="itemList active">
                <input
                  type="checkbox"
                  name="isChecked5Room"
                  id="5andmore"
                  checked={filter.isChecked5Room}
                  onChange={handleChange}
                ></input>
                <label htmlFor="5andmore" className="filter-label">
                  5+
                </label>
              </div>
            </div>
            <span className="error invisible"></span>
          </div>

          <div className="filter-block">
            <span className="title">
              <i className="fi fi-crit-room"></i>Bedrooms
            </span>
            <span className="description"></span>
            <div className="containerList">
              <div className="itemList active">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="nbBedrooms"
                  value="1"
                ></input>
                <label htmlFor="1" className="filter-label">
                  1
                </label>
              </div>
              <div className="itemList active">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="nbBedrooms"
                  value="2"
                ></input>
                <label htmlFor="2" className="filter-label">
                  2
                </label>
              </div>
              <div className="itemList active">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="nbBedrooms"
                  value="3"
                ></input>
                <label htmlFor="3" className="filter-label">
                  3
                </label>
              </div>
              <div className="itemList active">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="nbBedrooms"
                  value="4"
                ></input>
                <label htmlFor="4" className="filter-label">
                  4
                </label>
              </div>
              <div className="itemList active">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="nbBedrooms"
                  value="5"
                ></input>
                <label htmlFor="5andmore" className="filter-label">
                  5+
                </label>
              </div>
            </div>
            <span className="error invisible"></span>
          </div>

          <div className="filter-block">
            <span className="title">
              <i className="fi fi-heart"></i> Other criterias
            </span>
            <span className="description"></span>
            <div className="containerList">
              <div className="itemList active">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="others"
                  value="Garden"
                ></input>
                <label htmlFor="garden" className="filter-label">
                  <i className="fi fi-garden"></i>Garden
                </label>
              </div>
              <div className="itemList active">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="others"
                  value="Fireplace"
                ></input>
                <label htmlFor="fireplace" className="filter-label">
                  <i className="fi fi-crit-chimney"></i>Fireplace
                </label>
              </div>
              <div className="itemList active">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="others"
                  value="Caretaker"
                ></input>
                <label htmlFor="guardian" className="filter-label">
                  <i className="fi fi-crit-man-suit"></i>Caretaker
                </label>
              </div>
              <div className="itemList active">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="others"
                  value="Balcony"
                ></input>
                <label htmlFor="balcony" className="filter-label">
                  <i className="fi fi-crit-balcony"></i>Balcony
                </label>
              </div>
              <div className="itemList active">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="others"
                  value="Swimming Pool"
                ></input>
                <label htmlFor="Swimming-Pool" className="filter-label">
                  <i className="fi fi-crit-swimming-pool"></i>Swimming Pool
                </label>
              </div>

              <div className="itemList active">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="others"
                  value="Terrace"
                ></input>
                <label htmlFor="terrace" className="filter-label">
                  <i className="fi fi-crit-table"></i>Terrace
                </label>
              </div>
              <div className="itemList active">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="others"
                  id="parking"
                  value="Parking"
                ></input>
                <label htmlFor="parking" className="filter-label">
                  <i></i>Parking
                </label>
              </div>
            </div>
            <span className="error invisible"></span>
          </div>
        </form>
      </div>
      <br />

      {filteredProperties.map((property, i) => (
        <div key={i}>
          <div className="property-card">
            <div className="slider" key={property._id + Date.now()}>
              {api.isLoggedIn() && (
                <i
                  className="fav fas fa-heart white"
                  data-id="{{this._id}}"
                ></i>
              )}

              <AwesomeSlider className="slideshow-container">
                {property.pictures.map((pic, i) => (
                  <div
                    key={i}
                    data-src={pic}
                    alt={property.title + ' photo ' + (i + 1)}
                    className="imgs"
                  />
                ))}
              </AwesomeSlider>
            </div>

            <div key={property._id} className="property-details">
              <h3 className="card-title">
                {property.title} in {property.location}
              </h3>

              <p className="text-color">
                <strong>{property.budget}€ per month</strong>
                <br />
                <strong>
                  {property.size} m<sup>2</sup>
                </strong>
                <br />
                {property.rooms} rooms
                <br />
                {property.bedrooms} bedrooms
              </p>

              <div className="link-to-detail">
                <Link
                  to={`/detail/${property._id}`}
                  className="dropdowns link-to-detail"
                >
                  See more details
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* 
 function filterByRooms(prop) {
  if (
    filter.isChecked1Room === '' &&
    filter.isChecked2Room === '' &&
    filter.isChecked3Room === '' &&
    filter.isChecked4Room === '' &&
    filter.isChecked5Room === ''
  )
    return properties

  if (filter.isChecked1Room && prop.rooms === 1) return true
  if (filter.isChecked2Room && prop.rooms === 2) return true
  if (filter.isChecked3Room && prop.rooms === 3) return true
  if (filter.isChecked4Room && prop.rooms === 4) return true
  if (filter.isChecked5Room && prop.rooms >= 5) return true
}

/* <div className="filter-block">
            <span className="title">
              <i className="fi fi-crit-room"></i>Number of rooms
            </span>
            <span className="description"></span>
            <div className="containerList">
              <div className="itemList active">
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
          </div> 

function filterByBedrooms(prop) {
    if (
      filter.isChecked1Bedromm === '' &&
      filter.isChecked2Bedromm === '' &&
      filter.isChecked3Bedroom === '' &&
      filter.isChecked4Bedroom === '' &&
      filter.isChecked5Bedroom === ''
    )
      return properties

    if (filter.isChecked1Bedroom && prop.bedrooms === 1) return true
    if (filter.isChecked2Bedroom && prop.bedrooms === 2) return true
    if (filter.isChecked3Bedroom && prop.bedrooms === 3) return true
    if (filter.isChecked4Bedroom && prop.bedrooms === 4) return true
    if (filter.isChecked5Bedroom && prop.bedrooms >= 5) return true
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

    if (filter.isCheckedGarden && prop.others === 'Garden') return true
    if (filter.isCheckedFireplace && prop.others === 'Fireplace') return true
    if (filter.isCheckedCaretaker && prop.others === 'Caretaker') return true
    if (filter.isCheckedBalcony && prop.others === 'Balcony') return true
    if (filter.isCheckedPool && prop.others === 'Swimming Pool') return true
    if (filter.isCheckedTerrace && prop.others === 'Terrace') return true
    if (filter.isCheckedParking && prop.others === 'Parking') return true
    // return (
    //   (!filter.isCheckedGarden || prop.others === 'Garden') &&
    //   (!filter.isCheckedFireplace || prop.others === 'Fireplace') &&
    //   (!filter.isCheckedCaretaker || prop.others === 'Caretaker') &&
    //   (!filter.isCheckedBalcony || prop.others === 'Balcony') &&
    //   (!filter.isCheckedPool || prop.others === 'Swimming Pool') &&
    //   (!filter.isCheckedTerrace || prop.others === 'Terrace') &&
    //   (!filter.isCheckedParking || prop.others === 'Parking')
    // )
  }


*/
