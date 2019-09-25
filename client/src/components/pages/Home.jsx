import React from 'react'

export default function Home() {
  return (
    // <div className="Home">
    //   <a href="/forsale">
    //     <button class="button-view">For sale</button>
    //   </a>
    //   <a href="/forrent">
    //     <button class="button-view">For rent</button>
    //   </a>
    // <img
    //   class="background-image"
    //   src="./background-image.png"
    //   alt="backgroundimage"
    // />

    <div className="home">
      <div className="square-hp"> </div>

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
  )
}
