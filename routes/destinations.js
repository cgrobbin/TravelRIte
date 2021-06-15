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
            weather.find({search: `${destination.city}, ${destination.stateOrCountry}`, degreeType: 'F'}, function(err, result) {
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

// Posts New Destination
router.post('/new', isLoggedIn, (req, res) => {
    db.destination.create({
        city: req.body.city,
        stateOrCountry: req.body.stateOrCountry,
        image: req.body.image,
        population: req.body.population
    }).then(() => {
        res.redirect('/destinations')
    })
})

// Posts Destination to Profile
router.post('/:destid/fave', isLoggedIn, (req,res) => {
    db.favorites.findOrCreate({
        where: { userId: req.user.id },
        defaults: { destinationId: req.params.destid }
    }).then(([fave, created]) => {
        if (created) {
            req.flash('success', 'Destination Added to Favorites')
            res.redirect(`/destinations/${req.params.destid}`)
        } else {
            req.flash('error', 'Destination already in Favorites')
            res.redirect(`/destinations/${req.params.destid}`)
        }
    })
})

// Posts New Review
router.post('/:destid/addreview', isLoggedIn, (req, res) => {
    db.review.create({
        destinationId: req.params.destid,
        userId: req.user.id,
        content: req.body.content,
        rating: req.body.rating
    }).then(() => {
        res.redirect(`/destinations/${req.params.destid}`)
    })
})

// Edit Review
router.put('/:destid/:revid', isLoggedIn, (req, res) => {
    db.review.update({
        content: req.body.content,
        rating: req.body.rating
    }, {
        where: {id: req.params.revid}
    }).then(() => {
        res.redirect(`/destinations/${req.params.destid}`)
    })
})

// Deletes Review
router.delete('/:destid/:revid', isLoggedIn, (req, res) => {
    db.review.destroy({
        where: {id: req.params.revid}
    }).then(() => {
        res.redirect(`/destinations/${req.params.destid}`)
    })
})

// Deletes Destination
router.delete('/:destid', isLoggedIn, (req, res) => {
    db.destination.destroy({
        where: {id: req.params.destid}
    }).then(() => {
        res.redirect('/destinations')
    })
})

// Exports

module.exports = router;