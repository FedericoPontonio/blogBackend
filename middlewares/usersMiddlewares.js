const controllers = require('../controllers/usersController')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')

async function verifyPassword(req, res, next) {
    const user = await controllers.getUserByUsername(req.body.username);
    if (!user) {
        return res.status(401).json({
            message: "password or username incorrect"
        })
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    console.log(isMatch)
    if (!isMatch) {
        return res.status(401).json({
            message: "password or username incorrect"
        })
    }
    next()
};

async function checkUsernameUniquenessOnCreation(req, res, next) {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    })
    if (user) {
        return res.status(409).json({
            message: "Username already exists"
        })
    }
    next()
};

function checkPasswordMatch(req, res, next) {
    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({
            error: "Passwords do not match. Please try again."
        })
    }
    next()
}

module.exports = {
    verifyPassword,
    checkUsernameUniquenessOnCreation,
    checkPasswordMatch
}