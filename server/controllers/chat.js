const Chat = require('../models/chat')
const User = require('../models/user')
const utils = require('../utils')

const init = async (req, res) => {
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
    const contacts = await utils.generateContacts(response.user.id)
    const chats = await utils.generateChats(response.user.id)
    return res.status(200).json({
      statusCode: response.statusCode,
      contacts,
      chats
    })
  }
}

const createChat = async (req, res) => {
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
    let chat
    chat = await Chat.findOne({members: req.params.id, deletedMembers: response.user.id})
    if (chat) {
      chat.members.push(response.user.id)
      chat.deletedMembers = []
    } else {
      chat = new Chat({members: [response.user.id, req.params.id], deletedMembers: []})
    }
    chat.save()
      .then(async chat => {
        return res.status(201).json({
          statusCode: response.statusCode,
          entity: await utils.generateChat(chat, response.user.id),
          entityId: req.params.id
        })
      })
      .catch(err => {
        res.status(400).json({
          statusCode: 1,
          message: err.message
        })
      })
  }
}

const deleteChat = async (req, res) => {
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
    const chat = await Chat.findById(req.params.id)
    if (chat.deletedMembers.length > 0) {
      Chat.findByIdAndDelete(req.params.id)
        .then(async chat => {
          const user = await User.findOne({_id: chat.deletedMembers[0]}, '_id username status info')
          return res.status(200).json({
            statusCode: response.statusCode,
            entityId: chat._id,
            entity: utils.generateContact(user)
          })
        })
        .catch(err => {
          res.status(400).json({
            statusCode: 1,
            message: err.message
          })
        })
    } else {
      chat.members = chat.members.filter(member => member !== response.user.id)
      chat.deletedMembers.push(response.user.id)
      chat.save()
        .then(async chat => {
          const user = await User.findOne({_id: chat.members[0]}, '_id username status info')
          return res.status(200).json({
            statusCode: response.statusCode,
            entityId: chat._id,
            entity: utils.generateContact(user)
          })
        })
        .catch(err => {
          res.status(400).json({
            statusCode: 1,
            message: err.message
          })
        })
    }
  }
}

module.exports = {
  init,
  createChat,
  deleteChat,
}