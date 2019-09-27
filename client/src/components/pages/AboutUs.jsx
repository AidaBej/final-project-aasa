import React, { useEffect, useState } from 'react'
import api from '../../api'

export default function About() {
  const [about, setAbout] = useState([])
  useEffect(() => {
    api
      .getAbout()
      .then(about => {
        setAbout(about)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="About">
      <h2>About</h2>
      {/* {properties.map(c => (
        <li key={c._id}>{c.name}</li>
      ))} */}
    </div>
  )
}
