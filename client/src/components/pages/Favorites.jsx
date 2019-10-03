import React, { useEffect, useState } from 'react'
import api from '../../api'


export default function Favorites() {

  const [favorites, setFavorites] = useState([])
  const [properties, setProperties] = useState([])
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

  useEffect(() => {
    api
      .getFavorites()
      .then(favorites => {
        console.log(favorites)
        setFavorites(favorites)
      })
      .catch(err => console.log(err))
  }, [])

  const handleSave = (propertyId) => {

    if (!hasLiked(propertyId)) {
      api.addFavorite(propertyId).then(res => {
        localStorage.setItem("user", JSON.stringify(res))
        setUser(res)
      })
    } else {
      api.removeFavorite(propertyId).then(res => {
        localStorage.setItem("user", JSON.stringify(res))
        setUser(res)
      })
    }
  }

  // permet d'avoir le true/false:
  function hasLiked(propertyId) {
    return user.favorite.includes(propertyId)
  }

  return (

    <div className="Favorites">
      <h2 className="fav-title">Your saved properties</h2>

      {/* <button
        onClick={() => handleSave(property._id)}
        className="cta"
        href=""
        data-id={property._id}
      >
        <i className={hasLiked(property._id) ? "fas fa-heart" : "far fa-heart"} width="20px" alt="heart" /> */}
      {/* src="https://res.cloudinary.com/drukuybdj/image/upload/v1570019992/ironhack-project-3/properties/like-null_ws7xx5.png" */}
      {/* Save
        </button> */}

    </div>
  )
}
