import React, { useEffect, useState } from 'react'
import api from '../../api'
import test from './../../test'

export default function Test() {
  const [tests, setTest] = useState([])

  test()

  useEffect(() => {
    return
    api
      .getTest()
      .then(tests => {
        setTest(tests)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="container">
      <section className="background">
        <div className="content-wrapper">
          <p className="content-title">Welcome to Parisian Cocoon</p>
          <p className="content-subtitle">Scroll down</p>
        </div>
      </section>
      <section className="background">
        <div className="content-wrapper">
          <p className="content-title">Our properties</p>
          <p className="content-subtitle">Add gmaps</p>
        </div>
      </section>
      <section className="background">
        <div className="content-wrapper">
          <p className="content-title">Our team.</p>
          <p className="content-subtitle">Aimée, Aida & Sophie-Anne</p>
        </div>
      </section>
    </div>
  )
}
