import React, { useState, useEffect } from 'react'
import api from '../../api'

export default function EditOne(props) {
  const [property, setProperty] = useState({})

  useEffect(() => {
    let id = props.match.params.id
    api
      .getDetail(id)
      .then(res => {
        console.log(res)
        setProperty(res)
      })
      .catch(err => console.log(err))
  }, [])

  function handleInputChange(event) {
    setProperty({
      ...property,
      [event.target.name]: event.target.value,
    })
  }
  function handleChange(e) {
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setProperty({ ...property, [e.target.name]: value })
  }

  function handleClick(e) {
    e.preventDefault()
    let data = {
      title: property.title,
      type: property.type,
      kind: property.kind,
      location: property.location,
      localisation: property.localisation,
      budget: property.budget,
      size: property.size,
      rooms: property.rooms,
      bedrooms: property.bedrooms,
      others: property.others,
      description: property.description,
      pictures: property.pictures,
    }
    api
      .addProperty(data)
      .then(result => {
        console.log('SUCCESS!')
        setProperty({
          title: '',
          type: '',
          kind: '',
          location: '',
          localisation: '',
          budget: '',
          size: '',
          rooms: '',
          bedrooms: '',
          others: '',
          description: '',
          pictures: '',
        })
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="edit">
      <div className="">
        <div className="">
          <div className="">
            <h2 className="contact-title">Edit</h2>
            <form
              className="form-generic"
              onSubmit={handleClick}
              onChange={handleInputChange}
              enctype="multipart/form-data"
            >
              <div className="form-group col-md-10">
                <label for="InputTitle">Title</label>

                <input
                  type="text"
                  name="title"
                  value={property.title}
                  className="form-control"
                  placeholder="Title"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-10">
                <label for="InputType">Type</label>
                <input
                  type="text"
                  name="type"
                  value={property.type}
                  className="form-control"
                  // placeholder="Type : Apartment ? Houseboat ? Loft ? Duplex ? Triplex ? Penthouse ? "
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-10">
                <label for="InputKind">For rent/for sale</label>
                <input
                  type="text"
                  name="kind"
                  value={property.kind}
                  className="form-control"
                  // placeholder="For Rent ? For Sale ?"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-10">
                <label for="InputLocation">Location</label>
                <input
                  type="text"
                  name="location"
                  value={property.location}
                  className="form-control"
                  placeholder="Location : Paris 1, Paris 2, Paris 3, ..."
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-10">
                <label for="InputLocalisation">Localisation</label>
                <br />
                {property.localisation && (
                  <input
                    type="text"
                    name="localisation"
                    value={property.localisation.coordinates}
                    className="form-control"
                    // placeholder="Coordinates: [48.8558962, 2.3577906]"
                    onChange={handleInputChange}
                  />
                )}
              </div>

              <div className="form-group col-md-10">
                <label for="InputBudget">Price</label>
                <input
                  type="number"
                  name="budget"
                  value={property.budget}
                  className="form-control"
                  placeholder="Price in €"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-10">
                <label for="InputSize">
                  Size in m<sup>2</sup>
                </label>
                <input
                  type="number"
                  name="size"
                  value={property.size}
                  className="form-control"
                  placeholder="Size in m"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-10">
                <label for="InputRooms">Number of rooms</label>
                <input
                  id="InputRooms"
                  name="rooms"
                  value={property.rooms}
                  type="number"
                  className="form-control"
                  placeholder="Number of rooms"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-10">
                <label for="InputBedRooms">Number of Bedrooms</label>
                <input
                  id="InputBedRooms"
                  name="bedrooms"
                  value={property.bedrooms}
                  type="number"
                  className="form-control"
                  placeholder="Number of Bedrooms"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-10">
                <label for="InputOthers">Other criterias </label>
                <input
                  id="InputOthers"
                  name="criterias"
                  value={property.others}
                  type="text"
                  className="form-control-input"
                ></input>
              </div>
              <div className="form-group col-md-10">
                <label for="description">Description</label>
                <textarea
                  className="form-control"
                  id="textarea"
                  type="text"
                  rows="10"
                  columns="7"
                  value={property.description}
                  // placeholder="Add a little description of the property"
                ></textarea>
              </div>
              <div className="form-group col-md-10">
                <label for="pictures">Pictures</label>
                {/* {property.pictures.map((pic, i) => (
                
                <ul>
                    <li key={i} data-src={pic} alt={property.title}></li>
                  </ul>
                ))}
                )} */}
                <div>{property.pictures}</div>
                {/* <input id="property-imgs" type="file" name="image" /> */}
              </div>
              <div>
                <button
                  type="submit"
                  class="btn btn-primary"
                  onClick={e => handleClick(e)}
                >
                  Save Changes
                </button>
              </div>
              {/* </div> */}
            </form>
            <br />

            {/* <div className="background-image-signup"></div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
