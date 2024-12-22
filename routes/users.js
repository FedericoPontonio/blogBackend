require('dotenv').config();

const express = require('express');
const usersRouter = express.Router();
const controllers = require('../controllers/usersController');
const middlewares = require('../middlewares/usersMiddlewares');
const jwt = require('jsonwebtoken');

//login, generates user token
usersRouter.get('/login', middlewares.verifyPassword, (req, res) => {
    const username = req.body.username;
    const user = { name: username }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.status(200).json({ accessToken })
})

//create user
usersRouter.post('/', middlewares.checkUsernameUniquenessOnCreation, async (req, res) =>{
    try {
        //createUser expects username and password in the req.body
        await controllers.createUser(req.body)
        res.status(201).json({
            message: "user successfully created"
        })
    } catch (error) {
        res.status(400).json({
            message:"error creating user"
        })
    }
})

usersRouter.delete('/:userId', async (req, res) => {
    // id in params would suffice but insertion of body parameters serves as 2 steps validation
    const user = await controllers.getUserByUsername(req.body.username)
    if (!user) return res.status(409).json({
        message: "Username donesn't match the id. Check your inputs"
    })
    const userId = user.id
    try {
        if (user.admin) return res.status(403).json({
            message: `User ${user.username} is an admin. Can't delete.`
        })
        await controllers.deleteUser(userId)
        res.status(200).json({
            message: `User ${user.username} deleted successfully`
        })
    } catch (error) {
        // console.log(user)
        res.status(500).json({
            message: `Unable to delete user ${user.username}.`
        })
    }

})


module.exports = usersRouter;