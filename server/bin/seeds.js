const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })
const mongoose = require('mongoose')
const propertyModel = require('../models/Property')

// const bcrypt = require('bcrypt')
// const User = require('../models/User')
// const bcryptSalt = 10

require('../configs/database')
// ['Apartment', 'Triplex', 'Loft', 'Penthouse', 'Barge'],
// ['Balcony', 'Swimming Pool', 'Terrace', 'Caretaker'],

const properties = [
  {
    title: 'Old workshop with a bohemian spirit',
    type: 'Apartment',
    kind: 'For Sale',
    location: 'Paris 1',
    budget: 1298000,
    size: 101,
    rooms: 3,
    bedrooms: 2,
    localisation: {
      type: 'Point',
      coordinates: [48.782645, 1.690729],
    },
    others: 'Terrace',
    pictures: [
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569406185/ironhack-project-3/properties/old-whorkshop-bohemian-1_xda3yc.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569406183/ironhack-project-3/properties/old-whorkshop-bohemian-2_xun8hh.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569406183/ironhack-project-3/properties/old-whorkshop-bohemian-3_bm0rh2.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569406184/ironhack-project-3/properties/old-whorkshop-bohemian-4_yfq3aq.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569406184/ironhack-project-3/properties/old-whorkshop-bohemian-5_vfmteo.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569406184/ironhack-project-3/properties/old-whorkshop-bohemian-6_kir6ge.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569406184/ironhack-project-3/properties/old-whorkshop-bohemian-7_qqnyin.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569406184/ironhack-project-3/properties/old-whorkshop-bohemian-8_vceidy.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569406184/ironhack-project-3/properties/old-whorkshop-bohemian-9_yq4ib2.jpg',
    ],
    description:
      'Near the Montorgueil district, this former workshop of 101 m2 Carrez is located on the 3rd floor of a small condominium without elevator. The entrance serves a living room of 41 m2 extended kitchen open, then a master bedroom with storage and bathroom, a second bedroom, a bathroom and separate toilet. Between two courtyards, this crossing apartment is bathed in light thanks to its many openings giving clear views. This calm place of life, with pleasant volumes, is decorated in bohemian chic spirit. A cellar completes this property. Subject to the status of the condominium. Metro: Sentier. Contact : Aïda, 0624409581',
  },
  {
    title: 'Mini loft in Montorgueil',
    type: 'Loft',
    kind: 'For Sale',
    location: 'Paris 2',
    budget: 400000,
    size: 29,
    rooms: 1,
    bedrooms: 1,
    localisation: {
      type: 'Point',
      coordinates: [48.6483903, 1.8352707],
    },
    pictures: [
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569406183/ironhack-project-3/properties/mini-loft-montorgueil-1_njqbh8.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569406183/ironhack-project-3/properties/mini-loft-montorgueil-2_pyyh7q.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569406183/ironhack-project-3/properties/mini-loft-montorgueil-3_in07e3.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569406183/ironhack-project-3/properties/mini-loft-montorgueil-4_glf80o.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569406183/ironhack-project-3/properties/mini-loft-montorgueil-5_ojbk6a.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569406183/ironhack-project-3/properties/mini-loft-montorgueil-6_elqdry.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569406183/ironhack-project-3/properties/mini-loft-montorgueil-7_w8a0v1.jpg',
    ],
    description:
      'Rue de la Lune, space designed by architect of 29 m2 (28,55 m2 carrez) square located on the ground floor in a charming condominium. The crossing place offers a stay with a done up kitchen on courtyard, and side street a dining area. Between two windows, a bed has been cleverly arranged. A walk-in shower room with toilet completes the place. Contemporary spirit, optimized plan, quality materials, characterizes this apartment sold furnished and equipped. Metro Bonne Nouvelle. Contact : Aimée, 0666789151',
    others: 'Caretaker',
  },
  {
    title: 'Duplex in a private mansion in Le Marais',
    type: 'Duplex',
    kind: 'For Sale',
    location: 'Paris 3',
    budget: 1495000,
    size: 92,
    rooms: 2,
    bedrooms: 1,
    localisation: {
      type: 'Point',
      coordinates: [49.1949183, 6.6647235],
    },
    pictures: [
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569423670/ironhack-project-3/properties/duplex-private-mansion-6_zotuxk.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569423670/ironhack-project-3/properties/duplex-private-mansion-4_pzieer.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569423670/ironhack-project-3/properties/duplex-private-mansion-8_ppcvnh.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569423670/ironhack-project-3/properties/duplex-private-mansion-5_bkb9pj.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569423670/ironhack-project-3/properties/duplex-private-mansion-9_kqbzqw.jpg',
    ],
    description:
      'Rue Chapon, duplex of 92 m2 (86,44 m2 Carrez) overlooking the courtyard / garden and located on the noble floor of a 17th century mansion with elevator. The entrance opens onto a bright living room with its multiple openings, the cozy living room under mezzanine alongside the dining area with 4m50 high ceiling and a clear view of the courtyard. An independent fitted kitchen and a guest toilet complete this level. Upstairs, in an intimate atmosphere, a comfortable room with storage space and en-suite shower room, overlooking the living room. This duplex has benefited from a quality renovation and offers a unique quiet living in a chic ethnic spirit in an elegant mansion. Although subject to the status of the condominium, Guardian. Opportunity to acquire a parking space directly accessible by elevator. Metro: Arts et Métiers.',
    others: 'Parking',
  },
  {
    title: 'Duplex under the roof of a private mansion',
    type: 'Duplex',
    kind: 'For Sale',
    location: 'Paris 4',
    budget: 1495000,
    size: 136,
    rooms: 4,
    bedrooms: 3,
    localisation: {
      type: 'Point',
      coordinates: [48.8581277, 2.3563382],
    },
    others: 'Balcony',
    pictures: [
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569425418/ironhack-project-3/properties/duplex-under-roof-mansion-2_vgfuos.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569425418/ironhack-project-3/properties/duplex-under-roof-mansion-1_l6bc53.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569425418/ironhack-project-3/properties/duplex-under-roof-mansion-5_mvptwc.jpg',
    ],
    description:
      'At the foot of the metro Saint Paul and many shops, duplex under the roofs of an area of ​​136m2 (98,56 m2 carrez), with small terrace, within an exceptional mansion. Passing the carved solid wooden door, classified to the historical monuments, one reaches the property, located on the third and last floor, by an elegant stone staircase. The entrance with its cabinet of curiosities leads to a beautiful living room benefiting from a double height with 5 meters in the ridge covered with its apparent framework. In a house spirit, the apartment has a quadruple exposure, the living room is decorated with a functional chimney, it is extended by an open kitchen, storage, a laundry and separate toilet. With views of the main wooded courtyard, two bedrooms. A bedroom connected to a large mezzanine (office or bedroom), and another bedroom with its bathroom, dressing room and small mezzanine. Upstairs, overlooking the living room, a third bedroom, with its dressing room and a bathroom of charm, opens onto the small terrace full sky. This duplex nestled in the quiet of this condominium charged with history is a unique place of life. Property subject to condominium status.',
  },
  {
    title: 'Art Deco artist workshop',
    type: 'Apartment',
    kind: 'For Rent',
    location: 'Paris 14',
    budget: 4500,
    size: 109,
    rooms: 4,
    bedrooms: 1,
    localisation: {
      type: 'Point',
      coordinates: [48.8274436, 2.3344189],
    },

    pictures: [
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569491384/ironhack-project-3/properties/art-deco-artist-workshop-1_blwrzv.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569491384/ironhack-project-3/properties/art-deco-artist-workshop-4_zdxn4o.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569491384/ironhack-project-3/properties/art-deco-artist-workshop-2_ixa1is.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569491386/ironhack-project-3/properties/art-deco-artist-workshop-3_w96jg5.jpg',
    ],
    description:
      'Between Montparnasse and Denfert Rochereau, this artist’s studio of 109 m2 is located on the 2nd floor of a listed building from 1910, illustrating the transition between Art Nouveau and Art Deco. An entry serves the living room lit by a glass roof and enjoys 6 meters high. Facing the latter a dining room is extended an independent kitchen and a toilet. A staircase leads to the floor creates in the height which distributes a room with dressing, a room of shower with toilet, a buanderie and finally an office space / library opened giving on the room of life in front of the canopy. The brightness, the volumes, as well as the original architectural elements make this place unique. Metro: Raspail',
  },
  {
    title: 'Duplex with terrace in renowned architects building',
    type: 'Duplex',
    kind: 'For Rent',
    location: 'Paris 16',
    budget: 6700,
    size: 150,
    rooms: 5,
    bedrooms: 3,
    localisation: {
      type: 'Point',
      coordinates: [48.8623272, 2.2935019],
    },
    pictures: [
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569492159/ironhack-project-3/properties/duplex-terrace-architect-building-1_sob5pp.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569492159/ironhack-project-3/properties/duplex-terrace-architect-building-4_wayv9z.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569492159/ironhack-project-3/properties/duplex-terrace-architect-building-3_sokzzc.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569492158/ironhack-project-3/properties/duplex-terrace-architect-building-2_pngna5.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569492159/ironhack-project-3/properties/duplex-terrace-architect-building-5_qezx0m.jpg',
    ],
    description:
      'In absolute calm and out of sight, this duplex of 150 m2 (143 m2 Carrez) offers three spacious bedrooms and a comfortable living space giving access to a terrace of 31 m2. Located on the 3rd and 4th (and last) floors with elevator of a referenced architect building, the apartment overlooks the manicured gardens of the co-ownership. The duplex seduces with its modern and qualitative services thanks to recent development works. The building is secure and located in a quiet and shopping street near transport and the Bois de Boulogne. A cellar completes this property. A closed box in the residence can be rented in addition. Metro Jasmin. Rent 6700 euros / month. Fees tenant 1800 euros off inventory. Guaranteed deposit 12400 euros.',
    others: ['Terrace', 'Parking', 'Balcony'],
  },
  {
    title: 'Atypical house with pool',
    type: 'Penthouse',
    kind: 'For Rent',
    location: 'Paris 5',
    budget: 2895,
    size: 205,
    rooms: 4,
    bedrooms: 3,
    localisation: {
      type: 'Point',
      coordinates: [48.8482056, 2.3505388],
    },
    pictures: [
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569492972/ironhack-project-3/properties/atypical-house-pool-1_ovpsfc.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569492972/ironhack-project-3/properties/atypical-house-pool-2_ouiauw.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569492972/ironhack-project-3/properties/atypical-house-pool-3_nw3dbj.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569492972/ironhack-project-3/properties/atypical-house-pool-5_vm8stx.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569492972/ironhack-project-3/properties/atypical-house-pool-4_kuvfad.jpg',
    ],
    description:
      'House of 154m2 on three levels with garden, swimming pool and 15m2 of terrace. The house consists of a reception with a large fireplace, a dining kitchen. On the lower floor a master suite with a dressing room and a bathroom (bath and shower). At the first level, two bedrooms and an office or a third bedroom all overlooking a terrace of about 15m2 and a bathroom. The house is away from the street is in a quiet environment. The swimming pool and the garden faces the living room.',
    others: ['Swimming Pool', 'Terrace'],
  },
]

propertyModel
  .deleteMany()
  .then(() => {
    return propertyModel.create(properties)
  })
  .then(propertyCreated => {
    console.log(
      `${propertyCreated.length} property created with the following id:`
    )
    console.log(propertyCreated.map(property => property._id))
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })
