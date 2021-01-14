const express = require('express')
const router = express.Router()
const Proj = require('../projects/projects-model')
const {valPostId} = require('../middleware/middleware')

router.get('/', (req, res, next) => {
    Proj.get()
        .then(prj => {
            res.status(200).json(prj)
        })
        .catch(err => {
            next(err)
        })
})

router.get('/:id', valPostId, (req, res) => {
    res.status(200).json(req.prjct)
})





router.use((error, req, res) => {
    res.status(500).json({
      message: error.message
    })
  })

  module.exports = router;