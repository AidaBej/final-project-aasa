import React, { useEffect, useState } from 'react'
import api from '../../api'

export default function Favorites() {
  const [favorites, setFavorites] = useState([])
  useEffect(() => {
    api
      .getFavorites()
      .then(favorites => {
        setFavorites(favorites)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="Favorites">
      <h2>Favorites</h2>
      {/* {properties.map(c => (
        <li key={c._id}>{c.name}</li>
      ))} */}
    </div>
  )
}
