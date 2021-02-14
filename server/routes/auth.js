const express = require('express')

const userController = require('../controllers/user')

const router = express.Router()

router.post('/signIn', userController.signIn)
router.post('/signUp', userController.signUp)
router.get('/', userController.checkAuth)
router.post('/update', userController.updateProfile)

module.exports = router