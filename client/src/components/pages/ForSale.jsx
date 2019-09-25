import React, { useEffect, useState } from 'react'
import api from '../../api';


export default function ForSale() {
  const [properties, setProperties] = useState([])
  useEffect(() => {
    api
      .getProperties()
      .then(properties => {
        setProperties(properties)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="Properties-list">
      <h2>Properties for sale</h2>
      {properties.map(property => (
        <li key={property._id}>{property.title}</li>
      ))}
    </div>
  )
}
