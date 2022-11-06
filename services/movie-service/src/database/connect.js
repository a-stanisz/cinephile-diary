const mongoose = require('mongoose');
const User = require('../models/user');

mongoose.set('debug', true);

const {
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;

const connect = async () => {
  try {
    const connURI = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin&readPreference=primary&ssl=false`;
    await mongoose.connect(connURI);
  } catch (err) {
    console.error(err);
  }
  try {
    placeholderUser = new User({
      userId: 0,
      userRole: 'placeholder',
    });
    placeholderUser.save();
  } catch (error) {
    console.error(error)
  }
}

module.exports = connect;