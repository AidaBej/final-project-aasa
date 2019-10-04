import React from 'react'
// import properties from 'seeds.js'
import Parallax from './../Parallax'
// import ContactUs from './ContactUs'
import Map from './ReactGoogleMap'

// import api from '../../api'
// import test from './../../test';

export default function Home(props) {
  // const [properties, setProperties] = useState([])
  // const [viewport, setViewport] = useState({
  //   latitude: 48,
  //   longitude: 22,
  //   zoom: 10,
  //   width: '100vw',
  //   height: '100vh',
  // })

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
