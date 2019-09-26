import React, { useEffect, useState } from 'react'
import api from '../../api'
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
    <div className="Property">
      <h2>One property page</h2>
      <div> {property.title} </div>

      {/* {properties.map((property, i) => {
        return <div> {property.title} </div>
      })} */}
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
      </div> */}
    </div>
  );
}
