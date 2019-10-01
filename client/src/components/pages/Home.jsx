import React, { useEffect, useState, useRef } from "react";
// import properties from 'seeds.js'
// import mapboxgl from "mapbox-gl/dist/mapbox-gl";
// import Map from './pages/Map'

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
      {/* <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      // onViewportChange={viewport => this.setState({ viewport })}
      /> */}
    </>
  );
}
