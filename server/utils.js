const jwt = require('jsonwebtoken')

const User = require('./models/user')
const Chat = require('./models/chat')

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

const generateContacts = async userId => {
  let chats = await Chat.find({members: userId})
  chats = chats.map(c => c.members.filter(m => m !== userId)).flat()
  chats.push(userId)
  const users = await User.find({_id: {$nin: chats}}, '_id username status info')
  return users.map(generateContact)
}

const generateContact = user => {
  return {
    _id: user._id,
    name: user.username,
    text: user.status,
    info: user.info
  }
}

const generateChats = async userId => {
  const chats = await Chat.find({members: userId})
  return await Promise.all(chats.map(generateChat))
}

const generateChat = async (chat, userId) => {
  const id = chat.members.length > 1
    ? chat.members.filter(m => m !== userId)[0]
    : chat.deletedMembers[1]
  const user = await User.findById(id, 'username').exec()
  return {
    _id: chat._id,
    name: user.username,
    text: 'Last message text...',
    info: 'Message date'
  }
}

module.exports = {
  generateToken,
  verifyToken,
  generateContacts,
  generateChats,
  generateChat,
  generateContact
}
