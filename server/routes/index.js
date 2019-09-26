const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()
const nodemailer = require('nodemailer')
router.get('/secret', isLoggedIn, (req, res, next) => {
  res.json({
    secret: 42,
    user: req.user,
  })
})

router.post('/send-email', (req, res, next) => {
  console.log('here')

  let { name, email, topic, message } = req.body
  console.log(topic)
  console.log(name)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  })
  transporter
    .sendMail({
      from: email,
      to: process.env.GMAIL_EMAIL,
      subject: topic,
      text: message,
      html: `<b>Topic: ${topic}<br>Name: ${name}<br>Email: ${email}<br>Message: ${message}</b>`,
    })
    .then(info => res.send('ok'))
    .catch(error => console.log(error))
})

module.exports = router
