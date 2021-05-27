// Imports

const express = require('express')
const router = express.Router()
const db = require('../models')
const isLoggedIn = require('../middleware/isLoggedIn')
const methodOverride = require('method-override')
const weather = require('weather-js')

router.use(methodOverride('_method'))

// Routes

// Destinations Index
router.get('/', (req, res) => {
    db.destination.findAll()
        .then((destinations) => {
            const destArr = []
            destinations.forEach((destination) => {
                destArr.push(destination)
            })
            res.render('destinations/index.ejs', { destinations: destArr })
        })
})

// New Destination
router.get('/new', (req, res) => {
    res.render('destinations/new.ejs')
})

// Destination Show
router.get('/:destid', (req, res) => {
    db.destination.findOne({
        where: {
            id: req.params.destid
        },
        include: [db.review]
    }).then((destination) => {
        db.review.findAll({
            where: {destinationId: req.params.destid},
            include: [db.user]
        }).then((reviews) => {
            weather.find({search: `${destination.city}, ${destination.stateOrCounty}`, degreeType: 'F'}, function(err, result) {
                if (err) console.log(err)
                let results = result[0]
                res.render('destinations/show.ejs', {
                    destination: destination,
                    reviews: reviews,
                    results: results
                })
            })
        })
    })
})

// Exports

module.exports = router;