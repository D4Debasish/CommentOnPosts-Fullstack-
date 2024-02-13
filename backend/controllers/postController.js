const mongoose = require('mongoose');
const Post = require('../models/Posts.js');
const UserModel = require('../models/Users.js')



exports.getAllPosts = async (req, res) => {
  // Get all posts from MongoDB
  const posts = await Post.find().lean();

  if (!posts?.length) {
    return res.status(400).json({ message: 'No posts found' });
  }

  res.json(posts);
};

exports.createPost = async (req, res) => {
  const { content, author } = req.body;

  if (!content || !author) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const authorObjectId = new mongoose.Types.ObjectId(author);
  const postObject = {
    content,
    author: authorObjectId,
  };

  const post = await Post.create(postObject);
  const user = await UserModel.findById(authorObjectId);
  if (!user) {
    return res.status(400).json({ message: 'Invalid author' });
  }
  const postId = post._id;
  user.posts.push(postId);
  await user.save();

  if (post) {
    res.status(201).json({ message: `New post ${content} created` });
  } else {
    res.status(400).json({ message: 'Invalid post data received' });
  }
};

exports.comments = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { text, parentId } = req.body;
    const userId = req.userId;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = {
      text,
      author: userId,
      parentId,
    };

    post.comments.push(newComment);

    await post.save();

    const newCommentId = post.comments[post.comments.length - 1]._id;
    const timestamp = post.comments[post.comments.length - 1].timestamp;

    res.status(201).json({
      message: 'Comment added successfully',
      comment: { _id: newCommentId, timestamp: timestamp, ...newComment },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
