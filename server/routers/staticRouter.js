const staticRouter = require('express').Router()
const path = require('path')

staticRouter.get('/js/:name', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/'))
})

module.exports = staticRouter