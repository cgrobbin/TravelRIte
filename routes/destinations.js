// Imports

const express = require('express')
const router = express.Router()
const db = require('../models')
const isLoggedIn = require('../middleware/isLoggedIn')
const methodOverride = require('method-override')

router.use(methodOverride('_method'))

// Routes
router.get('/', (req, res) => {
    res.render('destinations/index.ejs')
})

// Exports

module.exports = router;