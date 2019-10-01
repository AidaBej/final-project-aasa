import React, { useEffect, useState } from 'react'
import api from '../../api'
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

export default function Properties(props) {

  const [property, setProperty] = useState({})

  useEffect(() => {
    let id = props.match.params.id
    api
      .getDetail(id)
      .then(res => {
        console.log(res)
        setProperty(res)
      }
      )
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="background-detail">
      <br /><br /><br /><br />
      <div className="title-block">
        <h2>{property.title} in {property.location}</h2>
      </div>

      {property.pictures && <AwesomeSlider>
        {property.pictures
          .map((pic, i) => (
            <div
              key={i}
              data-src={pic}
              alt={property.title + ' photo ' + (i + 1)}
              className="imgs"
            />
          ))}
      </AwesomeSlider>}

      <div className="img-card">
        <div key={property._id}>
          <p><strong>{property.budget}€</strong></p>
          <p><strong>{property.type} {property.kind}</strong></p>
          <p>{property.rooms} rooms</p>
          <p>{property.bedrooms} bedrooms</p>
          <p>{property.size} m²</p>
          <p>{property.location}</p>
        </div>
      </div>
    </div>
  );
}