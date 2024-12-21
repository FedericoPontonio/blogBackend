const { PrismaClient } = require('@prisma/client')
const { use } = require('passport')
const prisma = new PrismaClient()

async function getUserByUsername(username) {
    return await prisma.user.findUnique({
        where: {
            username: username
        }
    })
}

async function createUser(reqBody) {
    await prisma.user.create({
        data: {
            username: reqBody.username,
            password: reqBody.password,
        }
    })
}

module.exports = {
    createUser,
    getUserByUsername
}