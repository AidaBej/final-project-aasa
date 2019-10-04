import React, { useState } from 'react'
import { Marker, InfoWindow } from 'react-google-maps'
import { Link } from 'react-router-dom'
const CustomMarker = ({ property }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleOpen = () => {
    setIsOpen(true)
  }
  const handleToggleClose = () => {
    setIsOpen(false)
  }
  return (
    property && (
      <Marker
        onClick={handleToggleOpen}
        icon={{
          url:
            'https://res.cloudinary.com/drukuybdj/image/upload/v1569850095/ironhack-project-3/properties/logo_xgzym8.gif',
          scaledSize: new window.google.maps.Size(46, 46),
        }}
        position={{
          lat: property.localisation.coordinates[0],
          lng: property.localisation.coordinates[1],
        }}
      >
        {isOpen && (
          <InfoWindow onCloseClick={handleToggleClose}>
            <>
              <p>{property.title}</p>
              <img src={property.pictures[0]} alt="image" width="300px" />
              <br />
              <br />
              <Link to={`/detail/${property._id}`}>View detail</Link>
            </>
          </InfoWindow>
        )}
      </Marker>
    )
  )
}

export default CustomMarker
