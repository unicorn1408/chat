const bcrypt = require('bcryptjs');
const { generateColor } = require('../../helpers/generateColor');
const User = require('../../models/user');

/**
 * function to render the signup page
 * @param {object} req - request object
 * @param {object} res - response object
 */
const signUpPage = (req, res) => {
  try {
    res.render('signup', {
      title: 'Chat | SignUp',
    });
  } catch (e) {
    next(e);
  }
};

/**
 * function to register new user
 * @param {object} req - request object
 * @param {object} res - reqponse object
 */
const registerNewUser = async (req, res) => {
  try {
    const hashPassword = bcrypt.hashSync(req.body.password, 9);

    const newUser = new User({
      email: req.body.email,
      password: hashPassword,
      color: generateColor(),
    });

    await newUser.save();

    res.redirect('/signin');
  } catch (e) {
    next(e);
  }
};

module.exports = { signUpPage, registerNewUser };
