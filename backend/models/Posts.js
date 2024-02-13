const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
  parentId: { type: String, default: null }, // change to undefined if not working
});

const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  comments: [commentSchema],
});

const Post = mongoose.model('Posts', postSchema);

module.exports = Post;
