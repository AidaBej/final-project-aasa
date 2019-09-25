import React, { useEffect, useState } from 'react'
import api from '../../api'

export default function ContactUs() {
  const [contactus, setContactUs] = useState([])
  useEffect(() => {
    api
      .getContactUs()
      .then(contactus => {
        setContactUs(contactus)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="ContactUs">
      <h2>Contact us</h2>
      {/* {properties.map(c => (
        <li key={c._id}>{c.name}</li>
      ))} */}
    </div>
  )
}
