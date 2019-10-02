import React, { useEffect, useState } from 'react'
import api from '../../api'


export default function Favorites() {
  const [favorites, setFavorites] = useState([])
  useEffect(() => {
    api
      .getFavorites()
      .then(favorites => {
        console.log(favorites)
        setFavorites(favorites)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <h1>Hellllo</h1>
    // <div className="Favorites">
    //   <h2 className="fav-title">Favorites</h2>

    //   {/* <p>{user.favorite}</p> */}
    //   {/* {properties.map(c => (
    //     <li key={c._id}>{c.name}</li>
    //   ))} */}
    // </div>
  )
}
