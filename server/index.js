const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRouter = require('./routes/auth')
const chatRouter = require('./routes/chat')
const Message = require('./models/message')
const Chat = require('./models/chat')
const utils = require('./utils')

const PORT = process.env.PORT || 3000
const URL = process.env.DB_URL || `mongodb://localhost:27017`

const app = express()

app.use(cors())
app.use(express.json())

const io = require('socket.io')(4000, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST']
  }
})

io.on('connection', socket => {
  socket.on('message', data => {
    const message = new Message(JSON.parse(data))
    message.save().then(message => io.emit('message', JSON.stringify(message)))
  })
  socket.on('init', async token => {
    const userId = (await utils.verifyToken(token)).user._id.toString()
    const chats = (await Chat.find({members: userId}, '_id')).map(chat => chat._id)
    const messages = await Message.find({chatId: {$in: chats}})
    socket.emit('init', JSON.stringify(messages))
  })
})

app.use('/auth', authRouter)
app.use('/chats', chatRouter)

mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
  .then(() => {
    console.log('Connected to mongo')
    app.listen(PORT, () => console.log(`Server started at port ${PORT}`))
  })
  .catch(e => {
    console.error(e)
    process.exit(1)
  })

process.on('SIGINT', () => process.exit(0))
