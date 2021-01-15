const express = require('express')
const router = express.Router()
const Act = require('../actions/actions-model')
const {valActId, valNewAct, valUpdateAct} = require('../middleware/middleware')


router.get('/', (req, res, next) => {
    Act.get()
        .then(act => {
            res.status(200).json(act)
        })
        .catch(err => {
            next(err)
        })
})

router.get('/:id', valActId, (req, res) => {
    res.status(200).json(req.act)
})

router.post('/', valNewAct, (req, res, next) => {
    Act.insert(req.body)
        .then(act => {
            res.status(200).json(act)
        })
        .catch(err => {
            next(err)
        })
})

router.put('/:id', valActId, valUpdateAct, (req, res, next) => {
    Act.update(req.params.id, req.body)
        .then(act => {
            res.status(200).json(act)
        })
        .catch(err => {
            next(err)
        })
})

router.delete('/:id', valActId, (req, res, next) => {
    Act.remove(req.params.id)
        .then(act => {
            res.status(200).json('Project has been deleted')
        })
        .catch(err => {
            next(err)
        })
})

router.use((err, req, res) => {
    res.status(500).json({
      message: err.message
    })
  })

module.exports = router