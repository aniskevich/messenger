const jwt = require('jsonwebtoken')

const User = require('./models/user')
const Chat = require('./models/chat')
const Message = require('./models/message')

const SECRET = 'SECRET'

generateToken = user => {
  const u = {
    email: user.email,
    _id: user._id.toString(),
    status: user.status,
    info: user.info,
    username: user.username
  }
  const token = jwt.sign(u, SECRET, {
    expiresIn: 60 * 60 * 24,
  })
  return {token, user: u}
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
  chats = chats.map(c => {
    if (c.members.length > 1) {
      return c.members.filter(m => m !== userId)
    } else {
      return c.deletedMembers[0]
    }
  }).flat()
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
  return await Promise.all(chats.map(chat => generateChat(chat, userId)))
}

const generateChat = async (chat, userId) => {
  const id = chat.members.length > 1
    ? chat.members.filter(m => m !== userId)[0]
    : chat.deletedMembers[0]
  const user = await User.findById(id, 'username').exec()
  const message = (await Message.find({chatId: chat._id}).sort({ createdAt: -1 }).limit(1).exec())[0]
  let text = '...'
  let info = '...'
  if (message) {
    text = message.message
    info = (new Date(message.createdAt)).toLocaleDateString()
  }
  return {
    _id: chat._id,
    name: user.username,
    text: text,
    info: info
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
