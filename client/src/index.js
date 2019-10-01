import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App.jsx'
// import registerServiceWorker from './registerServiceWorker';
// import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)

// registerServiceWorker();
