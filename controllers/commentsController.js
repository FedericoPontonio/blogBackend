const { PrismaClient } = require('@prisma/client')
const { post } = require('../routes/posts')
const prisma = new PrismaClient()

async function createComment(postId, reqBody) {
    await prisma.comment.create({
        data: {
            postId: postId,
            userId: +reqBody.userId,
            text: reqBody.text,
        }
    })
}

module.exports = {
    createComment,
}