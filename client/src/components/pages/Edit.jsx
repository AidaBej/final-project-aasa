// import React, { useState, useEffect } from 'react'
// import api from '../../api'

// export default function EditProperty(props) {
//   const [edit, setEdit] = useState

//   useEffect(() => {
//     api.getProperties('/all').then(p => {
//       console.log(p)
//       setEdit({
//         ...edit,
//         properties: [...p],
//       })
//     })
//   }, [])

//   const [properties, setProperties] = useState([])

//   function getAllProperties() {
//     return properties
//     .map(property => property)
//   }

//   return (
//     // <div className="edit">
//     //   <h2 className="manage-properties-title">Manage your Properties stock</h2>
//     //   {}
//     //   <div>
//     //     <div className="property-card">
//     //       <div className="slider" key={property._id + Date.now()}>
//     //         <AwesomeSlider className="slideshow-container">
//     //           {property.pictures.map((pic, i) => (
//     //             <div
//     //               key={i}
//     //               data-src={pic}
//     //               alt={property.title + ' photo ' + (i + 1)}
//     //               className="imgs"
//     //             />
//     //           ))}
//     //         </AwesomeSlider>
//     //       </div>

//     //       <div key={property._id} className="property-details">
//     //         <h3 className="card-title">
//     //           {property.title} in {property.location}
//     //         </h3>

//     //         <p className="text-color">
//     //           <strong>{property.budget}€ per month</strong>
//     //           <br />
//     //           <strong>
//     //             {property.size} m<sup>2</sup>
//     //           </strong>
//     //           <br />
//     //           {property.rooms} rooms
//     //           <br />
//     //           {property.bedrooms} bedrooms
//     //         </p>

//     //         <div className="link-to-detail">
//     //           <Link
//     //             to={`/detail/${property._id}`}
//     //             className="dropdowns link-to-detail"
//     //           >
//     //             See more details
//     //           </Link>
//     //         </div>
//     //       </div>
//     //     </div>
//     //   </div>
//   // </div>
//   )
//   }
