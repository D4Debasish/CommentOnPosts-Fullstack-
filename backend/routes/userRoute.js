const { Router } = require('express')
const router = Router()

const userController = require('../controllers/userController.js')

router.route('/register').post(userController.register)

module.exports = router
