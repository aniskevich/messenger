const jwt = require('jsonwebtoken')

const User = require('./models/user')

const SECRET = 'SECRET'

generateToken = user => {
  const u = {
    email: user.email,
    _id: user._id.toString(),
  }
  return jwt.sign(u, SECRET, {
    expiresIn: 60 * 60 * 24,
  })
}

verifyToken = token => {
  return jwt.verify(token, SECRET, async (err, token) => {
    if (err) {
      return {
        statusCode: 1,
        message: err.message,
      }
    }
    const user = await User.findOne({_id: token._id}, '_id username email status info')
    if (!user) {
      return {
        statusCode: 1,
        message: 'Unauthorized',
      }
    } else {
      return {
        statusCode: 0,
        user
      }
    }
  })
}

module.exports = {
  generateToken,
  verifyToken,
}
