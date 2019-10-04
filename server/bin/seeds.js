const path = require('path')
// require('dotenv').config()
// require('../configs/database')
const mongoose = require('mongoose')
const propertyModel = require('../models/Property')

// const bcrypt = require('bcrypt')
// const User = require('../models/User')
// const bcryptSalt = 10

// ['Apartment', 'Triplex', 'Loft', 'Penthouse'],
// ['Balcony', 'Caretaker'],

const properties = [
  {
    title: 'Triplex loft with terrace in hypercentre',
    type: 'Triplex',
    kind: 'For Sale',
    location: 'Paris 5',
    budget: 1295000,
    size: 127,
    rooms: 6,
    bedrooms: 3,
    localisation: {
      type: 'Point',
      coordinates: [48.8841657, 2.3593645],
    },
    pictures: [
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569934368/ironhack-project-3/properties/triplex-hypercentre-1_ja2swc.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569934368/ironhack-project-3/properties/triplex-hypercentre-2_wkj8ij.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569934368/ironhack-project-3/properties/triplex-hypercentre-3_vlcktk.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569934368/ironhack-project-3/properties/triplex-hypercentre-4_mfnji2.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569934368/ironhack-project-3/properties/triplex-hypercentre-5_os4to6.jpg',
    ],
    description:
      'In Paris 5th arrondissement, this apartment of 127 m² (101.54 m² Carrez) is located in the city center, close to all shops and close to public transport. On the 2nd and last floor with elevator of a small residence of the 90s, this magnificent triplex very bright profits from a very nice height under ceiling and greenery thanks to its pretty terrace exposed south. The spacious living room of 57 m² with fireplace and 9 m high ceiling with large windows overlooking a terrace facing south and its open kitchen. In extension, a space TV or office as well as a toilet complete this level. A metal staircase leads to a mezzanine and its library and its first sleeping area with two bedrooms of 14.50 and 10.30 m², which share a bathroom with toilet. At the third level is discovered the parental space composed of a room with glass roof overhanging the living room, and its bathroom. Two parking spaces and a cellar add to the benefits of this unique and rare property. Gare de Sèvres-Ville d’Avray 10 minutes walk, 2 stations from Versailles Right Bank and 20 minutes from St Lazare. Bus in the street in 10 minutes to Boulogne or Versailles. Commerce nearby within walking distance. Parc de Saint-Cloud at 6 min. Pont de Saint-Cloud in 13 min by car by the park of Saint-Cloud (subscription). Crèches, elementary and primary school La Ronce and Edmond Rostand nearby. La Fontaine du Roy College 3 min walk. International School of Sèvres in 12 min by bus.',
    others: ['Balcony', 'Fireplace', 'Caretaker', 'Terrace'],
  },
  {
    title: 'Duplex penthouse near the Place du Commerce',
    type: 'Penthouse',
    kind: 'For Sale',
    location: 'Paris 15',
    budget: 1250000,
    size: 122,
    rooms: 4,
    bedrooms: 3,
    localisation: {
      type: 'Point',
      coordinates: [48.8445017, 2.2937179],
    },
    pictures: [
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569935745/ironhack-project-3/properties/duplex-penthouse-1_jrjcyf.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569935745/ironhack-project-3/properties/duplex-penthouse-4_g3b6q6.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569935745/ironhack-project-3/properties/duplex-penthouse-5_tvajje.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569935745/ironhack-project-3/properties/duplex-penthouse-2_ttjjy2.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569935745/ironhack-project-3/properties/duplex-penthouse-3_lzagia.jpg',
    ],
    description:
      'Grenelle area near the Place du Commerce and Motte-Piquet Grenelle, this crossing duplex located in absolute calm offers a surface of 99m ² Carrez. Located on the top two floors of the condominium, former residence of the Citroën factories, this cozy apartment offers solid oak flooring and the charm of old beams. It consists of an entrance, a guest toilet, a lounge / living room of 46.20m2, a kitchen and an office. Two exterior windows with balcony and view on courtyard, are true skylights reinforcing the stamp of this space reception. From there, the central staircase leads to the attic sleeping area, it serves three rooms under Velux offering a beautiful natural light, a sky view and Eiffel Tower for those street side quiet. In the center, a tiled bathroom in rustic chic style whose natural irregular wood seduce lovers of authenticity includes a shower and a toilet. Many storage spaces are subtly integrated offering real development potential on these volumes to reinvent. A cellar completes this property subject to the status of the condominium. Metro: Commerce, Félix Faure, Émile Zola.',
    others: ['Balcony', 'Parking', 'Fireplace'],
  },
  {
    title: 'Last floor to revisit rue Mouffetard',
    type: 'Apartment',
    kind: 'For Sale',
    location: 'Paris 4',
    budget: 1400000,
    size: 155,
    rooms: 6,
    bedrooms: 5,
    localisation: {
      type: 'Point',
      coordinates: [48.8431174, 2.3496251],
    },
    others: ['Fireplace', 'Caretaker'],
    pictures: [
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569935220/ironhack-project-3/properties/luxurious-loft-1_xzhtq4.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569935220/ironhack-project-3/properties/luxurious-loft-4_yylxke.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569935220/ironhack-project-3/properties/luxurious-loft-2_yn9hho.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569935220/ironhack-project-3/properties/luxurious-loft-3_xq2wvz.jpg',
    ],
    description:
      'Located in the heart of the district Mouffetard and close to the Place Monge, this amazing surface located on the 4th and last floor is entirely to rethink around century-old beams and develops a surface of 155m ² (105m ² Carrez). The entrance to the largest lot overlooks a corridor serving all the rooms, including a large living room in double exposure with a fireplace. On the opposite side are a kitchen, a bathroom and two bedrooms. A first staircase leads to an extra bedroom with an open bathroom under the eaves. On the same landing and adjoining the first one, a second lot opens directly onto a reception room with a cathedral height which also reveals vintage beams. A kitchen corner completes this level which also benefits from a zenith light coming from Velux. Distributed by a spiral staircase, a mezzanine bedroom has a bathroom with wc. Finally a third lot adjoining the first two lots, offers a volume all in length. Now converted into a large studio, it also has a shower room with toilet and a kitchenette. Preserved by time, this surface to be reinvented is extremely rare on the local market. Consisting of three lots, it is a real playground for all those who dream of a unique property, a good in their image. The immediate proximity of the businesses of the street Mouffetard, offers in addition to this place a quality of life which made the reputation of the district Mouffetard. Well subject to the status of the condominium. Metro: Censier-Daubenton or Monge',
  },
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
      coordinates: [48.8558962, 2.3577906],
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
    title: 'Luxury and refurbished houseboat on the Seine',
    type: 'Houseboat',
    kind: 'For Sale',
    location: 'Paris 7',
    budget: 1700000,
    size: 150,
    rooms: 4,
    bedrooms: 2,
    localisation: {
      type: 'Point',
      coordinates: [48.86343519796315, 2.3121648429922743],
    },
    others: ['Swimming Pool', 'Terrace'],
    pictures: [
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569875169/ironhack-project-3/properties/peniche-1_dss62e.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569875169/ironhack-project-3/properties/peniche-6_zzhecm.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569875169/ironhack-project-3/properties/peniche-2_djoiea.jpg',
    ],
    description:
      'The whole houseboat is decorated with wonderful warm carpentry and lots of copper lamps, hinges and locks. By doing so we have chosen to maintain the original atmosphere aboard our ship. In the living room there is a wooden floor, painted in soft green, matching the rest of the interior very nicely. Note the wonderfully shaped windows along the ship, giving a very nice view over the harbor. And of course the many traditional Dutch elements such as the amazing woodstove burner/stove and the Delfts Blue tiles surrounding it.',
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
      coordinates: [48.8632886, 2.3562899],
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
      coordinates: [48.8584556, 2.3517023],
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
      coordinates: [48.858205, 2.282117],
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
    others: ['Swimming Pool', 'Terrace', 'Garden'],
  },
  {
    title: 'Lovely houseboat on the Seine',
    type: 'Houseboat',
    kind: 'For Rent',
    location: 'Paris 13',
    budget: 4500,
    size: 200,
    rooms: 3,
    bedrooms: 1,
    localisation: {
      type: 'Point',
      coordinates: [48.85341, 2.3488],
    },
    others: ['Swimming Pool', 'Terrace'],
    pictures: [
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569875169/ironhack-project-3/properties/peniche-5_tdlh51.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569875169/ironhack-project-3/properties/peniche-4_grztml.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569875169/ironhack-project-3/properties/peniche-3_vvj7gp.jpg',
    ],
    description:
      'Welcome aboard this beautifully restored 1-bedroom Paris houseboat on the Seine with exceptional views of Paris. If you want to be right there in the heart of Paris this is the place!  Staying on board this luxurious 5* Paris houseboat is a truly memorable experience.',
  },
  {
    title: 'Lovely Triplex',
    type: 'Triplex',
    kind: 'For Rent',
    location: 'Paris 16',
    budget: 2300,
    size: 68,
    rooms: 3,
    bedrooms: 1,
    localisation: {
      type: 'Point',
      coordinates: [48.8581239, 2.2882045],
    },
    others: ['Caretaker', 'Balcony'],
    pictures: [
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569877031/ironhack-project-3/properties/Triplex-4_svxvap.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569877031/ironhack-project-3/properties/Triplex-2_ynekfr.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569877031/ironhack-project-3/properties/Triplex-3_w8krje.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569877031/ironhack-project-3/properties/Triplex-1_cvtiml.jpg',
    ],
    description:
      'In the immediate vicinity of the Parc de Passy, ​​shops of the rue de Passy and the Seine, this triplex of 68 m2 is on the ground floor of a beautiful building of the 50s. The first level consists of a living room with a fitted kitchen. On the floor, two crossing rooms offer the possibility of one or two rooms. There is also a modern shower room with a toilet and a laundry area. Enjoying the quiet of a quiet street and the West exposure on greenery, the apartment has double glazed windows and aluminum shutters. Metro: Passy. Rent 2300 euros / month. Fees tenant 820 euros off inventory. Guaranteed deposit 4600 euros.',
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
      coordinates: [48.864174, 2.3465192],
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
    title: 'Old workshop on the last floor',
    type: 'Loft',
    kind: 'For Rent',
    location: 'Paris 11',
    budget: 6000,
    size: 215,
    rooms: 7,
    bedrooms: 4,
    localisation: {
      type: 'Point',
      coordinates: [48.869202, 2.3773985],
    },
    pictures: [
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569932875/ironhack-project-3/properties/loft-for-rent-2_uadv7d.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569932877/ironhack-project-3/properties/loft-for-rent-1_ua6mjj.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569932875/ironhack-project-3/properties/loft-for-rent-3_i16bjs.jpg',
    ],
    description:
      'In a small Eiffel style building on courtyard, rue de la Fontaine au Roi, this former workshop located on the 2nd and last floor with an area of ​​215 m2 (192 m2 Carrez) develops on two levels. From the entrance, this plateau of over 100 m2 offers a beautiful feeling of space and volumes. The fitted kitchen open to the dining room is next to a warm living room with a fireplace and extended by an office space. A laundry room, separate toilet and a bathroom complete the level. All under an apparent frame, and bathed in light thanks to its windows type workshop. Two independent access stairs lead to the top floor which accommodates three bedrooms and a master bedroom with shower room and toilet. Calm, light and volumes characterize this authentic place of life. Subject to the status of the condominium. Metro: Goncourt, Parmentier or République.',
    others: ['Garden', 'Fireplace', 'Caretaker'],
  },
  {
    title: 'Contemporary triplex with views',
    type: 'Triplex',
    kind: 'For Sale',
    location: 'Paris 10',
    budget: 661000,
    size: 100,
    rooms: 5,
    bedrooms: 3,
    localisation: {
      type: 'Point',
      coordinates: [48.8841657, 2.3593645],
    },
    pictures: [
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569933895/ironhack-project-3/properties/triplex-for-sale-4_hd2hlt.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569933895/ironhack-project-3/properties/triplex-for-sale-3_w9ribw.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569933895/ironhack-project-3/properties/triplex-for-sale-1_niskot.jpg',
    ],
    description:
      'Rue du Faubourg Saint Denis, this apartment of 59,29 m2 Carrez, offers an exceptional view of the Sacré Coeur. Located on the 5th floor of a bourgeois building, this apartment has been completely remodeled, making it functional with a design and contemporary decoration. The entrance leads to the double living room with two windows facing West with a view on the horizon on the Sacré Coeur. The Bulthaup kitchen with central island reinforces the conviviality of this living room. East side, the room decorated with a headboard that defines an office space and a night area, facing a small balcony with views. The shower room with a dressing room and toilet enjoys a great brightness. This place of life combines the classic chevron parquet and moldings, with many custom contemporary fittings. Subject to the status of the condominium. Metro: Gare du Nord or La Chapelle.',
    others: ['Balcony', 'Fireplace', 'Caretaker'],
  },
  {
    title: 'Beautiful and spacious loft with terrace',
    type: 'Loft',
    kind: 'For Rent',
    location: 'Paris 15',
    budget: 4000,
    size: 127,
    rooms: 6,
    bedrooms: 3,
    localisation: {
      type: 'Point',
      coordinates: [48.8449432, 2.2896262],
    },
    pictures: [
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569934368/ironhack-project-3/properties/triplex-hypercentre-1_ja2swc.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569934368/ironhack-project-3/properties/triplex-hypercentre-2_wkj8ij.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569934368/ironhack-project-3/properties/triplex-hypercentre-3_vlcktk.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569934368/ironhack-project-3/properties/triplex-hypercentre-4_mfnji2.jpg',
      'https://res.cloudinary.com/drukuybdj/image/upload/v1569934368/ironhack-project-3/properties/triplex-hypercentre-5_os4to6.jpg',
    ],
    description:
      'In Paris 15th arrondissement, this apartment of 127 m² (101.54 m² Carrez) is located in the city center, close to all shops and close to public transport. On the 2nd and last floor with elevator of a small residence of the 90s, this magnificent triplex very bright profits from a very nice height under ceiling and greenery thanks to its pretty terrace exposed south. The spacious living room of 57 m² with fireplace and 9 m high ceiling with large windows overlooking a terrace facing south and its open kitchen. In extension, a space TV or office as well as a toilet complete this level. A metal staircase leads to a mezzanine and its library and its first sleeping area with two bedrooms of 14.50 and 10.30 m², which share a bathroom with toilet. At the third level is discovered the parental space composed of a room with glass roof overhanging the living room, and its bathroom. Two parking spaces and a cellar add to the benefits of this unique and rare property. Gare de Sèvres-Ville d’Avray 10 minutes walk, 2 stations from Versailles Right Bank and 20 minutes from St Lazare. Bus in the street in 10 minutes to Boulogne or Versailles. Commerce nearby within walking distance. Parc de Saint-Cloud at 6 min. Pont de Saint-Cloud in 13 min by car by the park of Saint-Cloud (subscription). Crèches, elementary and primary school La Ronce and Edmond Rostand nearby. La Fontaine du Roy College 3 min walk. International School of Sèvres in 12 min by bus.',
    others: ['Balcony', 'Fireplace', 'Caretaker', 'Terrace'],
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
