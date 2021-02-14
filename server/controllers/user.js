const bcrypt = require('bcrypt')

const User = require('../models/user')
const utils = require('../utils')

const signIn = (req, res) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if (!user) {
      return res.status(404).json({
        statusCode: 1,
        message: 'Email or Password is Wrong',
      })
    }
    bcrypt.compare(req.body.password, user.password, (err, valid) => {
      if (!valid) {
        return res.status(404).json({
          statusCode: 1,
          message: 'Email or Password is Wrong',
        })
      } else {
        const {token, ...newUser} = utils.generateToken(user)
        return res.status(200).json({
          statusCode: 0,
          token,
          user: newUser.user
        })
      }
    })
  })
}

const signUp = (req, res) => {
  User.findOne({email: req.body.email}, (err, user) => {
    const body = req.body
    if (user) {
      return res.status(403).json({
        statusCode: 1,
        message: 'User already exists',
      })
    }
    const hash = bcrypt.hashSync(body.password.trim(), 10)
    const newUser = new User({email: body.email, password: hash})
    newUser.save()
      .then(newUser => {
        const {token, ...u} = utils.generateToken(newUser)
        res.status(200).json({
          statusCode: 0,
          token,
          user: u.user
        })
      })
      .catch(err => {
        res.status(400).json({
          statusCode: 1,
          message: err.message,
        })
      })
  })
}

const checkAuth = async (req, res) => {
  const token = req.headers['authorization'].split(' ')[1]
  if (!token) {
    return res.status(401).json({
      statusCode: 1,
      message: 'Unauthorized',
    })
  }
  const response = await utils.verifyToken(token)
  if (response.statusCode !== 0) {
    return res.status(401).json(response)
  } else {
    return res.status(200).json(response)
  }
}

const updateProfile = async (req, res) => {
  const token = req.headers['authorization'].split(' ')[1]
  if (!token) {
    return res.status(401).json({
      statusCode: 1,
      message: 'Unauthorized',
    })
  }
  const response = await utils.verifyToken(token)
  if (response.statusCode !== 0) {
    return res.status(401).json(response)
  } else {
    const {_id, email, ...rest} = req.body
    const user = await User.findByIdAndUpdate(response.user.id, rest, {new: true, select: '_id username email status info'})
    res.status(200).json({
      statusCode: 0,
      user
    })
  }
}

module.exports = {
  signIn,
  signUp,
  checkAuth,
  updateProfile
}
