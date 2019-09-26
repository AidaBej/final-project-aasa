const express = require('express') // import express in this module
const router = new express.Router() // create an app sub-module (router)
const propertyModel = require('../models/Property')
const cloudinary = require('./../config/cloudinary')

//AFFICHER TOUS LES PRODUITS ET SELON CATEGORIES

router.get('/forsale', (req, res) => {
  res.render('forSale')
})

router.get('/:cat', (req, res) => {
  if (req.params.cat == 'all') {
    propertyModel
      .find()
      .then(dbRes => {
        res.render('products', { property: dbRes })
      })
      .catch(dbErr => console.log(dbErr))
  } else {
    propertyModel
      .find({ category: req.params.cat })
      .then(dbRes => {
        res.render('products', { property: dbRes })
      })
      .then(dbErr => console.log(dbErr))
  }
})

//--------- PRODUCTS "ADD TO COLLECTION"

// router.post("/prod-add", cloudinary.single("image"), (req, res) => {
//   const name = req.body.name;
//   const ref = req.body.ref;
//   const description = req.body.description;
//   const price = req.body.price;
//   const category = req.body.category;

//   if (!name || !ref || !price) {
//     res.render("products_add", {
//       errorMessage: "Name, Ref. and Price are required !"
//     });
//     return;
//   }

//   const newItem = {
//     name,
//     ref,
//     description,
//     price,
//     category
//   };
//   if (req.file) newItem.image = req.file.secure_url;

//   foodModel
//     .create(newItem)
//     .then(() => {
//       return res.redirect("/products/all");
//     })
//     .catch(error => {
//       console.log(error);
//       res.render("products_add", {
//         errorMessage: "Duplicate ref, please update form !"
//       });
//     });
// });

module.exports = router
