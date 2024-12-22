const { PrismaClient } = require('@prisma/client')
const { json } = require('express')
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

async function deleteUser(userId) {
    //delete related comments
    try {
        await prisma.comment.updateMany({
            where: {
                userId: userId
            },
            data: {
                userId: 0
            }
    })
    } catch (error) {
        return console.log(error)
    }
    //delete related posts
    try {
        await prisma.post.updateMany({
            where: {
                author: userId
            },
            data: {
                author: 0
            }
    })
    } catch (error) {
        return console.log(error)
    }
    //remove user
    try {
        await prisma.user.delete({
        where: {
            id: userId
        }
    })
    } catch (error) {
        return console.log(error)
    }
    
}

module.exports = {
    createUser,
    getUserByUsername,
    deleteUser
}