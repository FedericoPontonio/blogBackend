const express = require('express');
const commentsRouter = express.Router();
const controllers = require('../controllers/commentsController');
const verifyToken = require('../middlewares/verifyToken');
const controllersPosts = require('../controllers/usersController');


//create comment
commentsRouter.post('/:postId', verifyToken, async (req, res) => {
    let user;
    try {   //check if token valid / corresponds to a user
        user = await controllersPosts.getUserByUsername(req.user.name)
        const userId = user.id
    } catch (error) {
        return res.status(409).json({
            message: "Credentials unauthorized. you will be logged out."
            //a log out function should follow this error
        })
    }
    try {
    //createComment expects parameters userId and text as req.body
    await controllers.createComment(+req.params.postId, req.body.text, user.id)
    res.json({
        message: "comment created for post " + req.params.postId
    })
    } catch (error) {
        res.json({
            message: "error creating comment",
            error: error
        })
    }
})

module.exports = commentsRouter;