import React, { useState } from 'react'
import api from '../../api'

export default function AddProperty(props) {
  const [state, setState] = useState({
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
  const [message, setMessage] = useState(null)

  console.log(state)

  function handleInputChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }
  function handleChange(e) {
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setState({ ...state, [e.target.name]: value })
  }

  function handleClick(e) {
    e.preventDefault()
    console.log(state.name, state.description)
    let data = {
      title: state.title,
      type: state.type,
      kind: state.kind,
      location: state.location,
      localisation: state.localisation,
      budget: state.budget,
      size: state.size,
      rooms: state.rooms,
      bedrooms: state.bedrooms,
      others: state.others,
      description: state.description,
      pictures: state.pictures,
    }
    api
      .addProperty(data)
      .then(result => {
        console.log('SUCCESS!')
        setState({
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
        setMessage(`The new property '${state.title}' has been created`)
        setTimeout(() => {
          setMessage(null)
        }, 2000)
      })
      .catch(err => console.log(err))
  }
  return (
    <div className="addProperty">
      <div className="">
        <div className="">
          <div className="">
            <h2 className="contact-title">Add New Property</h2>
            <form
              className="form-generic"
              onSubmit={handleClick}
              onChange={handleInputChange}
              encType="multipart/form-data"
            >
              <div className="form-group col-md-10">
                {/* <label for="InputTitle">Title</label> */}

                <input
                  type="text"
                  name="title"
                  value={state.title}
                  className="form-control"
                  placeholder="Title"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-10">
                {/* <label for="InputType">Type</label> */}
                <input
                  type="text"
                  name="type"
                  onChange={handleInputChange}
                  value={state.type}
                  className="form-control"
                  placeholder="Type : Apartment ? Houseboat ? Loft ? Duplex ? Triplex ? Penthouse ? "
                />
              </div>
              <div className="form-group col-md-10">
                {/* <label for="InputKind">For rent/for sale</label> */}
                <input
                  type="text"
                  name="kind"
                  value={state.kind}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="For Rent ? For Sale ?"
                />
              </div>
              <div className="form-group col-md-10">
                {/* <label for="InputLocation">Location</label> */}
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="location"
                  value={state.location}
                  className="form-control"
                  placeholder="Location : Paris 1, Paris 2, Paris 3, ..."
                />
              </div>
              <div className="form-group col-md-10">
                {/* <label for="InputLocalisation">Localisation</label> */}
                <br />
                <input
                  type="text"
                  name="localisation"
                  value={state.localisation}
                  className="form-control"
                  onChange={handleInputChange}
                  placeholder="Coordinates: [48.8558962, 2.3577906]"
                />
              </div>

              <div className="form-group col-md-10">
                {/* <label for="InputBudget">Price</label> */}
                <input
                  type="number"
                  name="budget"
                  value={state.budget}
                  className="form-control"
                  onChange={handleInputChange}
                  placeholder="Price in €"
                />
              </div>
              <div className="form-group col-md-10">
                {/* <label for="InputSize">
                  Size in m<sup>2</sup>
                </label> */}
                <input
                  type="number"
                  name="size"
                  value={state.size}
                  className="form-control"
                  onChange={handleInputChange}
                  placeholder="Size in m"
                />
              </div>
              <div className="form-group col-md-10">
                {/* <label for="InputRooms">Number of rooms</label> */}
                <input
                  id="InputRooms"
                  name="rooms"
                  value={state.rooms}
                  type="number"
                  className="form-control"
                  onChange={handleInputChange}
                  placeholder="Number of rooms"
                />
              </div>
              <div className="form-group col-md-10">
                {/* <label for="InputBedRooms">Number of Bedrooms</label> */}
                <input
                  id="InputBedRooms"
                  name="bedrooms"
                  value={state.bedrooms}
                  type="number"
                  className="form-control"
                  onChange={handleInputChange}
                  placeholder="Number of Bedrooms"
                />
              </div>
              <div className="form-group col-md-10">
                <label htmlFor="InputOthers">Other criterias ? </label>
                <div className="containerList">
                  <div className="itemList active">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="others"
                      value="Garden"
                    ></input>
                    <label htmlFor="garden">Garden</label>
                  </div>
                  <div className="itemList active">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="others"
                      value="Fireplace"
                    ></input>
                    <label htmlFor="fireplace">Fireplace</label>
                  </div>
                  <div className="itemList active">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="others"
                      value="Caretaker"
                    ></input>
                    <label htmlFor="guardian">Caretaker</label>
                  </div>
                  <div className="itemList active">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="others"
                      value="Balcony"
                    ></input>
                    <label htmlFor="balcony">Balcony</label>
                  </div>
                  <div className="itemList active">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="others"
                      value="Swimming Pool"
                    ></input>
                    <label htmlFor="Swimming-Pool">Swimming Pool</label>
                  </div>

                  <div className="itemList active">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="others"
                      value="Terrace"
                    ></input>
                    <label htmlFor="terrace">Terrace</label>
                  </div>
                  <div className="itemList active">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="others"
                      id="parking"
                      value="Parking"
                    ></input>
                    <label htmlFor="parking">Parking</label>
                  </div>
                </div>
              </div>
              <br />
              <div className="form-group col-md-10">
                {/* <label for="description">Description</label> */}
                <textarea
                  className="form-control"
                  id="textarea"
                  rows="5"
                  columns="7"
                  defaultValue={state.description}
                  placeholder="Add a little description of the property"
                ></textarea>
              </div>
              <div className="form-group col-md-10">
                <label htmlFor="pictures">Pictures</label>
                <input id="property-imgs" type="file" name="image" />
              </div>
              <div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={e => handleClick(e)}
                >
                  Add
                </button>
              </div>
            </form>
            <br />

            {/* <div className="background-image-signup"></div> */}
          </div>
        </div>
      </div>
    </div>
    // <div className="AddProperty">
    //   <h2>Add new Property</h2>
    //   <form>
    //   Title:
    //     <input
    //       type="text"
    //       value={state.name}
    //       name="name"
    //       onChange={handleInputChange}
    //     />{' '}
    //     <br />
    //     Capitals:{' '}
    //     <input
    //       type="text"
    //       value={state.capitals}
    //       name="capitals"
    //       onChange={handleInputChange}
    //     />{' '}
    //     <br />
    //     Area:{' '}
    //     <input
    //       type="number"
    //       value={state.area}
    //       name="area"
    //       onChange={handleInputChange}
    //     />{' '}
    //     <br />
    //     Description:{' '}
    //     <textarea
    //       value={state.description}
    //       name="description"
    //       cols="30"
    //       rows="10"
    //       onChange={handleInputChange}
    //     />{' '}
    //     <br />
    //     <button onClick={e => handleClick(e)}>Create country</button>
    //   </form>
    //   {message && <div className="info">{message}</div>}
    // </div>
  )
}
