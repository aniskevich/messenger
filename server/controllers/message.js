const Message = require('../models/message')

createMessage = data => {
  const message = new Message(data)
  message.save().then(message => message)
}

module.exports = {
  createMessage,
}