const express = require('express')

const userController = require('../controllers/user')

const router = express.Router()

router.post('/signIn', userController.signIn)
router.post('/signUp', userController.signUp)
router.get('/', userController.checkAuth)

module.exports = router