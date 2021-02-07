const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRouter = require('./routes/auth')

const PORT = process.env.PORT || 3000
const URL = process.env.DB_URL || `mongodb://localhost:27017`

const app = express()

app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)


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
