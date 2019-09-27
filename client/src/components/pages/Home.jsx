import React from 'react'

export default function Home() {
  return (
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
      <div className="background-image-test"></div>
    </div>
  )
}
