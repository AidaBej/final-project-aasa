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

// //-------------- EDITER PRODUITS

// router.get("/prod-manage", (req, res) => {
//   foodModel
//     .find()
//     .then(dbRes => {
//       res.render("products_manage", { food: dbRes });
//     })
//     .catch(dbErr => console.log(dbErr));
// });

// router.get("/product-edit/:id", (req, res) => {
//   foodModel
//     .findById(req.params.id)
//     .then(dbRes => {
//       res.render("product_edit", { food: dbRes });
//     })
//     .catch(dbErr => console.log(dbErr));
// });

// router.post("/prod-edit/:id", (req, res) => {
//   const { name, ref, description, price, stock, category } = req.body;
//   const editItem = {
//     name,
//     ref,
//     description,
//     price,
//     stock,
//     category
//   };
//   foodModel
//     .findByIdAndUpdate(req.params.id, editItem)
//     .then(dbRes => res.redirect("/prod-manage"))
//     .catch(err => console.log(err));
// });

// //-------------- SUPPRIMER PRODUITS

// router.get("/delete/:id", (req, res) => {
//   foodModel
//     .findByIdAndRemove(req.params.id)
//     .then(dbRes => res.redirect("/prod-manage"))
//     .catch(err => console.log(err));
// });

// //------------USER PROFILE PAGE

// router.get("/user", (req, res) => {
//   // console.log(res.locals.user);
//   res.render("user");
// });

// // router.get("/user", (req, res) => {
// //   userModel
// //     .find()
// //     .then(dbRes => {
// //       res.render("user", { user: dbRes });
// //     })
// //     .catch(dbErr => console.log(dbErr));
// // });

// // router.get("/user/:id", (req, res) => {
// //   userModel
// //     .findById(req.params.id)
// //     .then(dbRes => {
// //       res.render("user", { user: dbRes });
// //     })
// //     .catch(dbErr => console.log(dbErr));
// // });

// router.post("/user", (req, res) => {
//   console.log(req.session.currentUser);
//   const { firstname, lastname, email, role } = req.body;
//   const editUser = {
//     firstname,
//     lastname,
//     email
//   };
//   userModel
//     .findByIdAndUpdate(req.session.currentUser._id, editUser, {
//       new: true
//     })
//     .then(dbRes => {
//       req.session.currentUser = dbRes;
//       res.locals.user = dbRes;
//       res.redirect("/user");
//     })
//     .catch(err => console.log(err));
// });

module.exports = router
