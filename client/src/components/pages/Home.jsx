import React, { useEffect, useState, useRef } from 'react'
// import properties from 'seeds.js'
import Parallax from './../Parallax'
import ContactUs from './ContactUs'
import Map from './ReactGoogleMap'

import api from '../../api'
// import test from './../../test';

export default function Home(props) {
  const [properties, setProperties] = useState([])
  const [viewport, setViewport] = useState({
    latitude: 48,
    longitude: 22,
    zoom: 10,
    width: '100vw',
    height: '100vh',
  })
  console.log('hello')
  useEffect(() => {
    let id = props.match.params.id

    // ici, au premier chargement du composant, cette fonction sera appelée (une fois seulement)
    // donc tu devras faire appel à ton utilitaire api pour réupérer la liste complète des properties
    // puis utiliser la fonction setProperties pour mettre à jour la const properties
    // enfin tu passeras properties en props du composant <Map /> qui se chargera de l'affichage des markers

    api
      .getProperties(id)
      .then(res => {
        // console.log(res)
        setProperties(res)
      })
      .catch(err => console.log(err))

    // }
  }, [])
  return (
    <>
      <Parallax />
      <Map fullMarkers={true} property={{}} />
      {/* <ContactUs {...props} /> */}

      {/* <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        // onViewportChange={viewport => this.setState({ viewport })}
      /> */}
    </>
  )
}
