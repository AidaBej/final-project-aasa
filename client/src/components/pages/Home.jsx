// import React from 'react'

// export default function Home() {
//   return (
//     <div className="home">
//       <div className="square-hp">
//         <div className="opacity-low"></div>
//         <div className="bloc-hp">
//           What are you looking for?
//           <div className="buttons">
//             <a href="/forsale">
//               <button className="button-view">Buy</button>
//             </a>
//             <a href="/forrent">
//               <button className="button-view">Rent</button>
//             </a>
//           </div>
//         </div>
//       </div>
//       <div className="background-image-test"></div>
//     </div>
//   )
// }

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
          {/* <p className="content-title">Welcome to Parisian Cocoon</p>
          <p className="content-subtitle">Scroll down</p> */}
          <div className="home">
            <div className="square-hp">
              <div className="opacity-low"></div>
              <div className="bloc-hp">
                What are you looking for?
                <div className="buttons">
                  <a href="/forsale">
                    <button className="button-view">Buy</button>
                  </a>
                  <a href="/forrent">
                    <button className="button-view">Rent</button>
                  </a>
                </div>
              </div>
            </div>
            {/* <div className="background-image-test"></div> */}
          </div>
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
