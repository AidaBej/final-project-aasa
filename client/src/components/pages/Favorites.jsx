import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'
import AwesomeSlider from 'react-awesome-slider'
import 'react-awesome-slider/dist/styles.css'

export default function Favorites(props) {

  // const [properties, setProperties] = useState([])
  const [favorites, setFavorites] = useState([])
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

  // let id = JSON.parse(localStorage.user)
  // console.log(JSON.parse(localStorage.getItem(user)._id))

  useEffect(() => {
    api
      .getFavsOfLoggedInUser(props.match.params.id)
      .then(favorites => {
        console.log("found fav")
        console.log(favorites)
        setFavorites(favorites)
      })
      .catch(err => console.log(err))
  }, [])

  // function hasLiked(propertyId) {
  //   return user.favorite.includes(propertyId)
  // }

  return (

    <div className="Favorites">
      <h2 className="fav-title">Your saved properties</h2>
      {favorites.map((favorite, i) => {
        return (
          <div key={i} className="property-card">

            <div className="slider" key={favorite._id + Date.now()}>
              <AwesomeSlider className="slideshow-container">
                {favorite.pictures.map((pic, i) => (
                  <div
                    key={i}
                    data-src={pic}
                    alt={favorite.title + ' photo ' + (i + 1)}
                    className="imgs"
                  />
                ))}
              </AwesomeSlider>
            </div>

            <div key={favorite._id} className="property-details">
              <h3 className="card-title">
                {favorite.title} in {favorite.location}
              </h3>

              <p className="text-color">
                <strong>{favorite.budget}€</strong>
                <br />
                <strong>
                  {favorite.size} m<sup>2</sup>
                </strong>
                <br />
                {favorite.rooms} rooms
                <br />
                {favorite.bedrooms} bedrooms
              </p>

              <div className="ctas">
                <Link to={`/detail/${favorite._id}`} className="cta">
                  More details
                </Link>
              </div>

            </div>

          </div>
        )
      })}
    </div>
  )
}
