const staticRouter = require('express').Router()

staticRouter.get('/js/:name', (req, res) => {
    res.sendFile()
})

module.exports = staticRouter