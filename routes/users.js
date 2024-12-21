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
    res.json({ accessToken })
})

//create user
usersRouter.post('/', async (req, res) =>{
    try {
        //createUser expects username and password in the req.body
        await controllers.createUser(req.body)
        res.json({
            message: "user successfully created"
        })
    } catch (error) {
        res.json({
            message:"error creating user"
        })
    }
})


module.exports = usersRouter;