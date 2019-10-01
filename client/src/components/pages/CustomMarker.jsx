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
    <Marker
      onClick={handleToggleOpen}
      position={{
        lat: property.localisation.coordinates[0],
        lng: property.localisation.coordinates[1],
      }}
    >
      {isOpen && (
        <InfoWindow onCloseClick={handleToggleClose}>
          <>
            <p>{property.title}</p>
            <Link to={`/detail/${property._id}`}>Coucou</Link>
          </>
        </InfoWindow>
      )}
    </Marker>
  )
}

export default CustomMarker
