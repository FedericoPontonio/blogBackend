const express = require('express');
const postRouter = express.Router();
const controllers = require('../controllers/postsControllers');
const controllersUsers = require('../controllers/usersController');
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
    let user;
    let userId;
    try {   //check if token valid / corresponds to a user
        user = await controllersUsers.getUserByUsername(req.user.name)
        userId = user.id
    } catch (error) {
        return res.status(409).json({
            message: "Credentials unauthorized. you will be logged out."
            //a log out function should follow this error
        })
    }    
    try {
        //the function expects the request body to be {title, caption, body}
        await controllers.createPost(req.body, userId);
        res.json({
            message: "Post successfully created!",
            user: req.user
        })
    } catch (error) {
            res.json({
        message: "Post creation failed.",
        error: error
    })
    }
})


module.exports = postRouter;