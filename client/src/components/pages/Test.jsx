import React, { useEffect, useState } from 'react'
import api from '../../api'

export default function Test() {
  const [tests, setTest] = useState([])
  useEffect(() => {
    api
      .getTest()
      .then(tests => {
        setTest(tests)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="Test">
      <h2>Test</h2>
      {/* {properties.map(c => (
        <li key={c._id}>{c.name}</li>
      ))} */}
    </div>
  )
}
