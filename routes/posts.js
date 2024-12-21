const express = require('express');
const postRouter = express.Router();
const controllers = require('../controllers/postsControllers');
const verifyToken = require('../middlewares/verifyToken');

//find all posts
postRouter.get('/', async (req, res) => {
    const allPosts = await controllers.getAllPosts();
    res.json({
        allPosts: allPosts
    })
});

//find unique post by id
postRouter.get('/:id', async (req, res) => {
    const post = await controllers.getPostById(+req.params.id);
    const comments = await controllers.getComments(+req.params.id);
    res.json({
        post: post,
        comments: comments
    })
});

//create post
postRouter.post('/', verifyToken, async (req, res) => {
    try {
        //the function expects the request body to be {title, caption, body}
        // await controllers.createPost(req.body);
        res.json({
            message: "Post successfully created!",
            user: req.user
        })
    } catch (error) {
            res.json({
        message: "Post creation failed."
    })
    }
})


module.exports = postRouter;