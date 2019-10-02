import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MainNavbar from './MainNavbar'
import Home from './pages/Home'
import ForSale from './pages/ForSale'
import ForRent from './pages/ForRent'
import ContactUs from './pages/ContactUs'
import Favorites from './pages/Favorites'
import Countries from './pages/Countries'
import Secret from './pages/Secret'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AboutUs from './pages/AboutUs'
import OneProperty from './pages/OneProperty'
import EditOne from './pages/EditOne'
import Map from './pages/Map'
import AddNewProperty from './pages/AddNewProperty'
import EditProperty from './pages/Edit'

export default function App() {
  return (
    <div className="App">
      <MainNavbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/forsale" component={ForSale} />
        <Route path="/forrent" component={ForRent} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/aboutus" component={AboutUs} />
        <Route path="/detail/:id" component={OneProperty} />
        <Route path="/contactus" component={ContactUs} />
        <Route path="/countries" component={Countries} />
        <Route path="/signup" component={Signup} />
        <Route path="/add-new-property" component={AddNewProperty} />
        <Route path="/manage-property" component={EditProperty} />
        <Route path="/edit/:id" component={EditOne} />
        <Route path="/login" component={Login} />
        <Route path="/secret" component={Secret} />
        <Route path="/map" component={Map} />

        <Route render={() => <h2>404</h2>} />
      </Switch>
    </div>
  )
}
