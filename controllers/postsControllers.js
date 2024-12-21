const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function getAllPosts() {
    return await prisma.post.findMany()
}
async function getPostById(id) {
    return await prisma.post.findUnique({
        where: {
            id: id
        }
    })    
}
async function getComments(id) {
    return await prisma.comment.findMany({
        where: {
            postId: id
        }
    })   
}


async function createPost(reqBody, userId) {
    await prisma.post.create({
        data: {
            title: reqBody.title,
            caption: reqBody.caption,
            body: reqBody.body,
            author: userId
        }
    })
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    getComments,
}