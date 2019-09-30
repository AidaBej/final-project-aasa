import React, { useEffect, useState } from 'react'
import api from '../../api'
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
// import { Link } from "react-router-dom";

export default function Properties(props) {
  const [property, setProperty] = useState([])
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
        <h2>{property.title} in {property.location}<sup>th</sup></h2>
      </div>

      {/* <AwesomeSlider className="pictures-list slideshow-container">
        {
          property.pictures.map((pic, i) => (
            <div key={i} data-src={pic} alt={property.title + ' photo ' + (i + 1)} className="img" />
            // <img key={i} src={pic} alt={property.title + ' photo ' + (i + 1)} className="imgs" />
          ))
        }
      </AwesomeSlider> */}
      <div>


        {/* <div className="img-card">
        {properties
          .map((property) => (
            <ul key={property._id}>
              <h2>{property.title}</h2>
             < img src={property.pictures[0]} alt={property.title} className="property-imgs" />

              <li>
                <Link to={property.singleproperty} className="property">
                  {property.title}
                </Link>
              </li>
              <li><strong>{property.budget}€</strong></li>
              <li><strong>{property.type} {property.kind}</strong></li>
              <li>{property.rooms} rooms || {property.bedrooms} bedrooms || {property.size} m²</li>
              <li>{property.location}</li>
            </ul>
          ))}
    */}
      </div>
    </div>
  );
}
