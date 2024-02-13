const UserModel = require('../models/Users.js')
const bcrypt = require('bcryptjs')

exports.register = async (req, res) => {
  const { username, password } = req.body
  // Confirm data
  if (!username || !password ) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  // Check for duplicate username
  const duplicateUsername = await UserModel.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()

  if (duplicateUsername) {
    return res.status(409).json({ message: 'Duplicate username' })
  }

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

  const userObject = {
    username,
    password: hashedPwd,
  }

  // Create and store new user
  const user = await UserModel.create(userObject)

  if (user) {
    //created
    res.status(201).json({ message: `New user ${username} created` })
  } else {
    res.status(400).json({ message: 'Invalid user data received' })
  }
}
