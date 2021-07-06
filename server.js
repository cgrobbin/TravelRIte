require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require("connect-flash")
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn')
const db = require('./models')
const cors = require('cors')
const upload = require('./services/ImageUpload')
const singleUpload = upload.single('file')
const { Op } = require('sequelize')

const app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

app.use(cors())

app.use(session({
  // a string used to generate a unique 
  // session ID cookie to share with the browser
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true 
}))

// the following two lines must appear after configuring the session
app.use(passport.initialize())
app.use(passport.session())

// FLASH
app.use(flash())
// adds a method to the req object for universal access

// Set up local variables (data that's accessible from anywhere in the app)
app.use((req, res, next) => {
  // before every route is loaded, attach flash messages and the 
  // current user to res.locals
  res.locals.alerts = req.flash()
  res.locals.currentUser = req.user
  
  next()
})

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/search', (req, res) => {
  db.destination.findAll({
    where: {
      city: {
        [Op.iLike]: `%${req.query.search}%`
      }
    }
  }).then((destinations) => {
    const destArr = []
    destinations.forEach((destination) => {
      destArr.push(destination)
    })
    res.render('destinations/search.ejs', {destinations: destArr})
  })
})

app.get('/profile', isLoggedIn, (req, res) => {
  db.user.findOne({
    where: {id: req.user.id},
    include: [db.destination]
  }).then((user) => {
    res.render('profile', {user: user});
  })
});

// Posts new Profile Pic with AWS S3 Uploading
app.post('/profile/pic', isLoggedIn, (req, res) => {
  singleUpload(req, res, function(err) {
    if (err) {
      req.flash('error', 'Error in Image Upload')
      console.log(err)
    }
    db.user.update({
      profilePic: req.file.location
    }, {
      where: { id: req.user.id }
    }).then(() => {
      res.redirect('/profile')
    })
  })
})

app.use('/auth', require('./routes/auth'));
app.use('/destinations', require('./routes/destinations'));

var server = app.listen(process.env.PORT || 3000, ()=> console.log(`🎧You're listening to the smooth sounds of port ${process.env.PORT || 3000}🎧`));

module.exports = server;
