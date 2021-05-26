'use strict';
const bcrypt = require('bcrypt');
const { query } = require('express');
const db = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await db.sequelize.sync({ force: true});
    console.log('All models synced');

    await queryInterface.bulkDelete('destinations', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    })

    const bulkDestinations = await queryInterface.bulkInsert('destinations', [
      {
        city: 'Amsterdam',
        stateOrCountry: 'Netherlands',
        image: 'https://i.imgur.com/jGvvrSrb.jpg',
        population: 821752,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        city: 'Athens',
        stateOrCountry: 'Greece',
        image: 'https://i.imgur.com/yqhd3OFb.jpg',
        population: 664046,
        createdAt: new Date(),
        updatedAt: new Date()
      },  {
        city: 'Berlin',
        stateOrCountry: 'Germany',
        image: 'https://i.imgur.com/7Nx7L5Tb.jpg',
        population: 3645000,
        createdAt: new Date(),
        updatedAt: new Date()
      },  {
        city: 'Budapest',
        stateOrCountry: 'Hungary',
        image: 'https://i.imgur.com/TfTm6aWb.jpg',
        population: 1756000,
        createdAt: new Date(),
        updatedAt: new Date()
      },  {
        city: 'Cairo',
        stateOrCountry: 'Eqypt',
        image: 'https://i.imgur.com/rHnFRJob.jpg',
        population: 9540000,
        createdAt: new Date(),
        updatedAt: new Date()
      },  {
        city: 'Copenhagen',
        stateOrCountry: 'Denmark',
        image: 'https://i.imgur.com/nJfF0oUb.jpg',
        population: 602481,
        createdAt: new Date(),
        updatedAt: new Date()
      },  {
        city: 'Istanbul',
        stateOrCountry: 'Turkey',
        image: 'https://i.imgur.com/ULuQanfb.jpg',
        population: 15460000,
        createdAt: new Date(),
        updatedAt: new Date()
      },  {
        city: 'London',
        stateOrCountry: 'England',
        image: 'https://i.imgur.com/adbtq81b.jpg',
        population: 8982000,
        createdAt: new Date(),
        updatedAt: new Date()
      },  {
        city: 'Madrid',
        stateOrCountry: 'Spain',
        image: 'https://i.imgur.com/fvH0Bmib.jpg',
        population: 3223000,
        createdAt: new Date(),
        updatedAt: new Date()
      },  {
        city: 'Montreal',
        stateOrCountry: 'Canada',
        image: 'https://i.imgur.com/eAQdsi6b.jpg',
        population: 1780000,
        createdAt: new Date(),
        updatedAt: new Date()
      },  {
        city: 'Oslo',
        stateOrCountry: 'Norway',
        image: 'https://i.imgur.com/K7hq70jb.jpg',
        population: 634293,
        createdAt: new Date(),
        updatedAt: new Date()
      },  {
        city: 'Paris',
        stateOrCountry: 'France',
        image: 'https://i.imgur.com/45l92dtb.jpg',
        population: 2161000,
        createdAt: new Date(),
        updatedAt: new Date()
      },  {
        city: 'Rio de Janeiro',
        stateOrCountry: 'Brazil',
        image: 'https://i.imgur.com/diaGEDyb.jpg',
        population: 6748000,
        createdAt: new Date(),
        updatedAt: new Date()
      },  {
        city: 'Rome',
        stateOrCountry: 'Italy',
        image: 'https://i.imgur.com/uJkNiFEb.jpg',
        population: 2873000,
        createdAt: new Date(),
        updatedAt: new Date()
      },  {
        city: 'Seoul',
        stateOrCountry: 'South Korea',
        image: 'https://i.imgur.com/BTGWRebb.jpg',
        population: 9776000,
        createdAt: new Date(),
        updatedAt: new Date()
      },  {
        city: 'Sydney',
        stateOrCountry: 'Australia',
        image: 'https://i.imgur.com/JMc9iIZb.jpg',
        population: 5312000,
        createdAt: new Date(),
        updatedAt: new Date()
      },  {
        city: 'Tel Aviv',
        stateOrCountry: 'Israel',
        image: 'https://i.imgur.com/0Tbur7bb.jpg',
        population: 435855,
        createdAt: new Date(),
        updatedAt: new Date()
      },  {
        city: 'Tokyo',
        stateOrCountry: 'Japan',
        image: 'https://i.imgur.com/mBXXWw0b.jpg',
        population: 13960000,
        createdAt: new Date(),
        updatedAt: new Date()
      },  {
        city: 'Vienna',
        stateOrCountry: 'Austria',
        image: 'https://i.imgur.com/s8HJ2Gwb.jpg',
        population: 1897000,
        createdAt: new Date(),
        updatedAt: new Date()
      },  {
        city: 'Warsaw',
        stateOrCountry: 'Poland',
        image: 'https://i.imgur.com/vpxImv0b.jpg',
        population: 1765000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {returning: true})
    console.log('bulk insert: ', bulkDestinations)

    await queryInterface.bulkDelete('users', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    })

    const bulkUsers = await queryInterface.bulkInsert('users', [
      {
        firstName: 'Caroline',
        lastName: 'Robbin',
        email: 'cgrobbin@gmail.com',
        password: bcrypt.hashSync('password123!', 12),
        profilePic: 'https://i.imgur.com/atiWRRcm.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        firstName: 'Alex',
        lastName: 'A',
        email: 'alex@test.com',
        password: bcrypt.hashSync('password', 12),
        profilePic: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        firstName: 'Vickie',
        lastName: 'R',
        email: 'vickie@test.com',
        password: bcrypt.hashSync('password', 12),
        profilePic: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        firstName: 'Stuart',
        lastName: 'R',
        email: 'stuart@test.com',
        password: bcrypt.hashSync('password', 12),
        profilePic: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        firstName: 'Zach',
        lastName: 'R',
        email: 'zach@test.com',
        password: bcrypt.hashSync('password', 12),
        profilePic: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {returning: true})
    console.log('bulk insert: ', bulkUsers)

    await queryInterface.bulkDelete('reviews', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    })

    const bulkReviews = await queryInterface.bulkInsert('reviews', [
      {
        userId: bulkUsers[4].id,
        destinationId: bulkDestinations[3].id,
        content: "So uh, Budapest. Yeah",
        rating: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        userId: bulkUsers[0].id,
        destinationId: bulkDestinations[7].id,
        content: "I mean, Big Ben, the eye, parliament. Pretty cool place",
        rating: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        userId: bulkUsers[2].id,
        destinationId: bulkDestinations[12].id,
        content: "Such a lovely city. The people though, not so much",
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        userId: bulkUsers[3].id,
        destinationId: bulkDestinations[15].id,
        content: "Great Barrier Reef! More like big pile of lies. The opera house was cool looking but I couldn't hear anything!",
        rating: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        userId: bulkUsers[1].id,
        destinationId: bulkDestinations[18].id,
        content: "Where are all the sausages???",
        rating: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {returning: true})
    console.log('Bulk insert: ', bulkReviews)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
