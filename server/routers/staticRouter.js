const staticRouter = require('express').Router()
const path = require('path')

staticRouter.get('/js/:name', (req, res) => {
    console.log(req.params.name)
    console.log()
    res.sendFile(path.join(__dirname, `static/js/${req.params.name}`))
})

module.exports = staticRouter