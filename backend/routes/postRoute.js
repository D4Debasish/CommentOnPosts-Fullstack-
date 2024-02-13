const { Router } = require('express')
const router = Router()
const verifyJWT = require('../middleware/verifyJWT')
const postsController = require('../controllers/postController.js')
// posts
router.use(verifyJWT)
router.route('/getAllPosts').get(postsController.getAllPosts)
router.route('/createPost').post(postsController.createPost)

// comments
router.route('/comments/:postId').post(postsController.comments)
router.route('/replies/:commentId').post(postsController.comments)

module.exports = router
