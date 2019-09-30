import React, { useEffect, useState } from 'react'
import ReactMapGL from 'react-map-gl'

import Parallax from './../Parallax'
// import api from '../../api';
// import test from './../../test';

export default function Home() {
  const [viewport, setViewport] = useState({
    latitude: 48,
    longitude: 22,
    zoom: 10,
    width: '100vw',
    height: '100vh',
  })

  return (
    <>
      <Parallax />
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        // onViewportChange={viewport => this.setState({ viewport })}
      />
    </>
  )
}
