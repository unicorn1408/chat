const { check } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Room = require('../models/rooms');

module.exports = {
  requireEmail: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must be a valid email')
    .custom(async (email) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('This email already in use');
      }
    }),
  requirePassword: check('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Must be between 4 and 20 characters'),
  requireEmailExists: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must provide a valid email')
    .custom(async (email) => {
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        throw new Error('Email doesn\`t exist');
      }
    }),
  requireValidPasswordForUser: check('password')
    .trim()
    .custom(async (password, { req }) => {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        throw new Error('Email or password is invalid');
      }

      const validPassord = bcrypt.compareSync(password, user.password);

      if (!validPassord) {
        throw new Error('Email or password is invalid');
      }
    }),
  requireName: check('newroom')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Must be between 4 and 20 characters')
    .custom(async (newroom) => {
      const existingRooms = await Room.findOne({ name: newroom });
      if (existingRooms) {
        throw new Error(`Room with name "${newroom}" already exists`);
      }
    }),
  requireText: check('messageText')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Must be up to 1000 characters'),

};
