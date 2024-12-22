const { PrismaClient } = require('@prisma/client')
const { post } = require('../routes/posts')
const prisma = new PrismaClient()

async function createComment(postId, text, userId) {
    await prisma.comment.create({
        data: {
            postId: postId,
            userId: userId,
            text: text,
        }
    })
}

module.exports = {
    createComment,
}