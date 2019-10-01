import React, { useState, useEffect } from 'react'
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer,
} from 'react-google-maps'
import CustomMarker from './CustomMarker'
import _ from 'lodash'
import api from '../../api'

console.log(process.env.REACT_APP_GOOGLEMAP_API)

const Map = React.memo(props => {
  return (
    <GoogleMap
      onClick={props.handleMapClicked}
      ref={props.onMapMounted}
      onBoundsChanged={props.onBoundsChanged}
      defaultZoom={12}
      center={props.center}
      defaultCenter={{ lat: 48.866667, lng: 2.333333 }}
    >
      {props.properties.map((p, i) => (
        <CustomMarker key={i} property={p} />
      ))}
    </GoogleMap>
  )
})

const WrapperMap = withScriptjs(withGoogleMap(Map))

const AppMap = props => {
  const [state, setState] = useState({
    bounds: null,
    center: {
      lat: 48.866667,
      lng: 2.333333,
    },
    markers: [],
    properties: [],
  })

  const refs = {}

  useEffect(() => {
    api.getProperties().then(p => {
      console.log(p)
      setState({
        ...state,
        properties: [...p],
      })
    })
  }, [])

  const onMapMounted = ref => (refs.map = ref)
  const onBoundsChanged = () => {
    setState({
      ...state,
      bounds: refs.map.getBounds(),
      center: refs.map.getCenter(),
    })
  }

  const handleMarkerClick = props => {
    console.log(props)
    console.log(props.latLng.lat())
    console.log(props.latLng.lng())
  }

  const handleToggleOpen = e => {
    console.log(e)
  }
  return (
    <div style={{ height: '50vh' }}>
      <WrapperMap
        onToggleOpen={handleToggleOpen}
        properties={state.properties}
        handleMarkerClick={handleMarkerClick}
        onBoundsChanged={onBoundsChanged}
        center={state.center}
        onMapMounted={onMapMounted}
        markers={state.markers}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLEMAP_API}`}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    </div>
  )
}

export default AppMap
