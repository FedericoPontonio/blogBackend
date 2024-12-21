const controllers = require('../controllers/usersController')

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
    //to test
    //curl -X POST -H "Content-Type:application/json" localhost:3000/users/login -d '{"username": "test user2", "password": "test password"}'
    //change password to have it fail
}


module.exports = {
    verifyPassword,
}