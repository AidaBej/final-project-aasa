import React, { useEffect, useState } from 'react'
import api from '../../api'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import ReactGoogleMap from './ReactGoogleMap'
// import Map from './Map'
// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

export default function About() {
  const [about, setAbout] = useState([])
  useEffect(() => {
    // api
    //   .getAbout()
    //   .then(about => {
    //     setAbout(about)
    //   })
    //   .catch(err => console.log(err))
  }, [])

  return (
    <div className="About">
      <h2>About</h2>
      <ReactGoogleMap />
      {/* {properties.map(c => (
        <li key={c._id}>{c.name}</li>
      ))} */}
    </div>
  )
}
