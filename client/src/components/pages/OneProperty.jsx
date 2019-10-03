import React, { useEffect, useState } from 'react'
import api from '../../api'
import AwesomeSlider from 'react-awesome-slider'
import 'react-awesome-slider/dist/styles.css'
import Map from './ReactGoogleMap'

export default function Properties(props) {
  const [property, setProperty] = useState({})

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

  return (
    <div className="background-detail">
      <br />
      <br />
      <br />
      <br />
      <div className="title-block">
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
          <h2>
            {property.location}, {property.title}
          </h2>
          <p>{property.description}</p>
          <p>Additional information: {property.others}</p>
        </div>

        <div className="details-right">
          <p>
            <strong>
              {property.type} {property.kind}
            </strong>
          </p>
          <p>
            <strong>Price: {property.budget}€</strong>
          </p>
          <p>Number of rooms: {property.rooms}</p>
          <p>Number of bedrooms:{property.bedrooms}</p>
          <p>Size: {property.size} m²</p>
          <p>Location: {property.location}</p>
        </div>
      </div>
      <Map property={property} />
    </div>
  )
}
