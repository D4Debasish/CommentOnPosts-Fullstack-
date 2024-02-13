const { Router } = require('express')
const router = Router()

const authController = require('../controllers/authController.js')

router.route('/login').post(authController.login)

router.route('/refresh').get(authController.refresh)

router.route('/logout').post(authController.logout)

module.exports = router
