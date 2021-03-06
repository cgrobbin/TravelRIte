'use strict';
const bcrypt = require('bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.review)
      models.user.belongsToMany(models.destination, { through: 'favorites' })
    }

    // validPassword
    validPassword(plainTextPassword) {
      // validate the plaintextpassword against the hash in the DB and return a boolean
      return bcrypt.compareSync(plainTextPassword, this.password)
    }

    // to JSON
    toJSON() {
      let userData = this.get()
      delete userData.password
      return userData
    }
  };
  user.init({
    firstName: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Must be between 1 and 99 characters'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Must be between 1 and 99 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 99],
          msg: 'Password must be between 8 and 99 characters'
        }
      }
    },
    profilePic: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });

  // Hooks = moments in time where we can trigger specific functionality
  user.beforeCreate((pendingUser, options) => {
    // check that a pending user and their pw exists
    if (pendingUser && pendingUser.password) {
      // hash the password with bcrypt
      let hash = bcrypt.hashSync(pendingUser.password, 12)
      // store the hashed password as the user's password in the DB
      pendingUser.password = hash;
    }
  });
  return user;
};