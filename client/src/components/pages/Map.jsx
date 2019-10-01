// import React, { useRef, useEffect } from 'react'
// import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
// // import api from '../../api'

// // export default function Map() {
// //   const mapDomRef = useRef(null)
// //   let map = useRef(null).current
// //   let markers = useRef(null).current

// useEffect(() => {
//   initMap(48, 2.33333)
// }, [])

// useEffect(() => {
//   api.getProperties().then(p => {
//     markers = []
//     for (let i = 0; i < p.length; i++) {
//       markers.push = new mapboxgl.Marker({ color: 'red' })
//         .setLngLat(p[i].localisation.coordinates)
//         .addTo(map)
//     }
//   })
// }, [])
// //   useEffect(() => {
// //     initMap(15, 45)
// //   }, [])

// //   useEffect(() => {
// //     api.getOnePropery().then(oneProperty => {
// //       markers = []
// //       for (let i = 0; i < oneProperty.length; i++) {
// //         markers.push = new mapboxgl.Marker({ color: 'red' })
// //           .setLngLat(oneProperty[i].localisation.coordinates)
// //           .addTo(map)
// //       }
// //     })
// //   }, [])

// //   function initMap(lng, lat) {
// //     // Embed the map where "mapDomRef" is defined in the render
// //     map = new mapboxgl.Map({
// //       container: mapDomRef.current,
// //       style: 'mapbox://styles/mapbox/streets-v11',
// //       center: [lng, lat],
// //       zoom: 3,
// //     })

// //     // Add zoom control on the top right corner
// //     map.addControl(new mapboxgl.NavigationControl())
// //   }

// //   return (
// //     <div>
// //       <div ref={mapDomRef} style={{ height: 400 }}></div>
// //     </div>
// //   )
// // }
