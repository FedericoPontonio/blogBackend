const controllers = require('../controllers/usersController')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function verifyPassword(req, res, next) {
    const user = await controllers.getUserByUsername(req.body.username);
    if (!user) {
        return res.status(401).json({
            message: "password or username incorrect"
        })
    }
    if (user.password !== req.body.password) {
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


module.exports = {
    verifyPassword,
    checkUsernameUniquenessOnCreation
}