const express = require('express');
const commentsRouter = express.Router();
const controllers = require('../controllers/commentsController')

//create comment
commentsRouter.post('/:postId', async (req, res) => {
    try {
        //createComment expects parameters userId and text as req.body
    await controllers.createComment(+req.params.postId, req.body)
    res.json({
        message: "comment created for post " + req.params.postId
    })
    } catch (error) {
        res.json({
            message: "error creating comment"
        })
    }
    
})

module.exports = commentsRouter;