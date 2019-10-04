import React from 'react'

export default function About() {
  return (
    <div className="About">
      <br />
      <br />
      <img className="img-about" src="/junot.png" alt="junot" width="100%" />
      <div className="who">
        <div className="weare">
          <h1>Who are we?</h1>
          <br />
          <p>
            Our team Parisian Cocoon, an agency dedicated to the success of your
            real estate transactions in Paris since 2019. Parisian Cocoon is a
            friend founded group and member of Leading Real Estate Companies of
            the Word. Specializing in luxury services for sales, rentals and
            property management, Parisian Cocoon represents the finest
            properties in Paris. With 15 agencies in the 3rd, 6th, 7th , 9th,
            10th, 16th, 17th and 18th arrondissements of Paris with 50,000
            active clients from both France and abroad, Parisian Cocoon sells 1
            property per day and property manages 300 million of real estate.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <div className="values">
              <div className="values-title">Our values</div>

              <div className="component-wrapper">
                <div className="component-item">
                  <img src="love.png" height="70px" alt="Values" />
                  <h2>Ethics and Transparency</h2>
                  <p>
                    We consider our business in the long term, and in a
                    relationship of absolute trust with our customers.
                  </p>
                </div>
                <div className="component-item">
                  <img src="cup.png" height="70px" alt="Values" />

                  <h2>Serious</h2>
                  <p>
                    We are very sophisticated and demanding as we are involved
                    in fundamental operations in our clients'lives.
                  </p>
                </div>
                <div className="component-item">
                  <img src="star.png" height="70px" alt="Values" />

                  <h2>Expertise</h2>

                  <p>
                    Our perennial, trained teams provide advice and know-how to
                    enhance the real estate we are responsible for.
                  </p>
                </div>
              </div>
              <div></div>
            </div>
          </div>

          <div className="col-sm-6 other">
            <div className="values">
              <div className="values-title">Our team</div>

              <div className="component-wrapper">
                <div className="component-item">
                  <img
                    src="/profilepic-linkedin.png"
                    height="90px"
                    alt="profile"
                  />
                  <h2>Aida</h2>
                  <p>Lead developer</p>
                </div>
                <div className="component-item">
                  <img src="aimee.jpg" height="90px" alt="profile" />

                  <h2>Aimée</h2>
                  <p>Front-end developer</p>
                </div>
                <div className="component-item">
                  <img src="SA.JPG" height="90px" alt="profile" />

                  <h2>Sophie-Anne</h2>

                  <p>Front-end developer</p>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
