const express = require('express')
const passport = require('passport')
const router = express.Router()

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt')
const bcryptSalt = 10

//Model to import
const User = require('../models/User')

//------------------------------------------------------
//------------------------------------------------------

//SIGN-UP

router.get('/signup', (req, res, next) => {
  res.render('signup')
})

router.post('/signup', (req, res, next) => {
  const { email, password, name } = req.body

  if (!name || !password || !email) {
    res.status(400).json({ message: 'Form incomplete' })
    return
  }
  User.findOne({ email })
    .then(userDoc => {
      if (userDoc !== null) {
        res.status(409).json({ message: 'The username already exists' })
        return
      }
      const salt = bcrypt.genSaltSync(bcryptSalt)
      const hashPass = bcrypt.hashSync(password, salt)
      const newUser = new User({ email, password: hashPass, name })
      return newUser.save()
    })
    .then(userSaved => {
      console.log(userSaved, '------------------')
      // LOG IN THIS USER
      // "req.logIn()" is a Passport method that calls "serializeUser()"
      // (that saves the USER ID in the session)
      req.logIn(userSaved, () => {
        // hide "encryptedPassword" before sending the JSON (it's a security risk)
        userSaved.password = undefined
        res.json(userSaved)
      })
    })
    .catch(err => next(err))
})

//------------------------------------------------------

//LOGIN

router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  console.log(email)
  // first check to see if there's a document with that username
  User.findOne({ email })
    .then(userDoc => {
      // "userDoc" will be empty if the username is wrong (no document in database)
      if (!userDoc) {
        // create an error object to send to our error handler with "next()"
        next(new Error('Incorrect email '))
        return
      }
      console.log(userDoc.password)
      // second check the password
      // "compareSync()" will return false if the "password" is wrong

      // console.log(
      //   bcrypt.compareSync(
      //     password,
      //     '$2b$10$OL38MsdfEe5vAJnjarM7aufokcLmKivnT29sICdxelA/me7Xrht3i'
      //   )
      // )
      // console.log(userDoc.password)

      if (!bcrypt.compareSync(password, userDoc.password)) {
        // create an error object to send to our error handler with "next()"
        next(new Error('Password is wrong'))
        return
      }

      // LOG IN THIS USER
      // "req.logIn()" is a Passport method that calls "serializeUser()"
      // (that saves the USER ID in the session)
      req.logIn(userDoc, () => {
        // hide "encryptedPassword" before sending the JSON (it's a security risk)
        userDoc.password = undefined
        res.json(userDoc)
      })
    })
    .catch(err => next(err))
})

router.post('/login-with-passport-local-strategy', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong' })
      return
    }

    if (!theUser) {
      res.status(401).json(failureDetails)
      return
    }

    req.login(theUser, err => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong' })
        return
      }

      // We are now logged in (notice req.user)
      res.json(req.user)
    })
  })(req, res, next)
})

//------------------------------------------------------

//LOGOUT

router.get('/logout', (req, res) => {
  req.logout()
  res.json({ message: 'You are out!' })
})

module.exports = router
