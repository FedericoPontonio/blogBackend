const express = require('express')
const router = express.Router()


router.get('/', async (req, res) => {
    res.json({
        message: "Successfully loaded homepage"
    })
});

router.use('/posts', require('./posts'));
router.use('/users', require('./users'));
router.use('/comments', require('./comments'));

module.exports = router;