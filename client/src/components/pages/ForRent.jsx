import React, { useEffect, useState } from 'react'
import api from '../../api'
import { Link } from "react-router-dom";

export default function Properties() {
  const [properties, setProperties] = useState([])
  useEffect(() => {
    api
      .getForRent()
      .then(properties => {
        setProperties(properties)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="Properties">
      <h2>Properties for rent</h2>
      <div className="img-card">
        {properties
          .map((property) => (
            <Link to={`/detail/${property._id}`}>
              <ul key={property._id}>
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
            </Link>
          ))}
      </div>
    </div>
  );
}
