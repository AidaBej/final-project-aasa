import React, { useEffect, useState } from 'react'
import api from '../../api'

export default function Properties() {
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
    <div className="Properties">
      <h2>For rent</h2>
      {/* {properties.map(c => (
        <li key={c._id}>{c.name}</li>
      ))} */}
    </div>
  )
}
