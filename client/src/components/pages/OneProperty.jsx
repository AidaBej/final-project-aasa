import React, { useEffect, useState } from 'react'
import api from '../../api'
import AwesomeSlider from 'react-awesome-slider'
import 'react-awesome-slider/dist/styles.css'
import Map from './ReactGoogleMap'

export default function Properties(props) {
  const [property, setProperty] = useState({})
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  useEffect(() => {
    let id = props.match.params.id
    api
      .getDetail(id)
      .then(res => {
        // console.log(res)
        setProperty(res)
      })
      .catch(err => console.log(err))
  }, [])

  const handleSave = propertyId => {
    if (!hasLiked(propertyId)) {
      api.addFavorite(propertyId).then(res => {
        localStorage.setItem('user', JSON.stringify(res))
        setUser(res)
      })
    } else {
      api.removeFavorite(propertyId).then(res => {
        localStorage.setItem('user', JSON.stringify(res))
        setUser(res)
      })
    }
  }

  function hasLiked(propertyId) {
    return user.favorite.includes(propertyId)
  }

  return (
    <div className="background-detail">
      <br />
      <br />
      <br />
      <div className="one-property-title">
        <h2>
          {property.title} in {property.location}
        </h2>
      </div>

      <div className="details-slider" key={property._id + Date.now()}>
        {property.pictures && (
          <AwesomeSlider>
            {property.pictures.map((pic, i) => (
              <div
                key={i}
                data-src={pic}
                alt={property.title + ' photo ' + (i + 1)}
                className="imgs"
              />
            ))}
          </AwesomeSlider>
        )}
      </div>
      <div className="details">
        <div className="details-left" key={property._id}>
          <h2 className="strong-title">
            {property.location}, {property.title}
          </h2>

          <br />
          <p>{property.description}</p>
        </div>

        <div className="details-right">
          <div className="header-left-column">
            <p className="strong-title">
              {property.type} {property.kind}
            </p>
            <div className="div-heart">
              {api.isLoggedIn() && (
                <i
                  onClick={() => handleSave(property._id)}
                  href=""
                  data-id={property._id}
                  className={
                    hasLiked(property._id) ? 'coeur fas fa-heart' : 'coeur far fa-heart'
                  }
                  alt="heart"
                />
              )}
            </div>
          </div>

          <p className="smaller-title">Price: {property.budget} €, agency fees excluded.</p>
          <p>The {property.type} is {property.size} m<sup>2</sup>.</p>
          <p>It has {property.rooms} rooms, and {property.bedrooms} bedrooms.</p>
          <p className="smaller-title">Location:</p>
          <p>{property.location}</p>
          <p className="smaller-title">Additional information:</p>
          <p>{property.others + ','}</p>
        </div>
      </div>
      <Map fullMarkers={false} property={property} />
    </div>
  )
}
