const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide a unique username'],
      unique: [true, 'Username already exists'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Users', userSchema);
