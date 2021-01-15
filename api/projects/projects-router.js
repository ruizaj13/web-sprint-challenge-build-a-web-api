const express = require('express')
const router = express.Router()
const Proj = require('../projects/projects-model')
const {valNewProj, valProjId, valUpdateProj} = require('../middleware/middleware')

router.get('/', (req, res, next) => {
    Proj.get()
        .then(prj => {
            res.status(200).json(prj)
        })
        .catch(err => {
            next(err)
        })
})

router.get('/:id', valProjId, (req, res) => {
    res.status(200).json(req.prjct)
})

router.get('/:id/actions', valProjId, (req, res, next) => {
    Proj.getProjectActions(req.params.id)
        .then(actions => {
            actions.length ? res.status(200).json(actions) : res.status(404).json(`Project with ID: ${req.params.id} has no actions`)
        })
        .catch(err => {
            next(err)
        })
})

router.post('/', valNewProj, (req, res, next) => {
    Proj.insert(req.body)
        .then(prj => {
            res.status(200).json(prj)
        })
        .catch(err => {
            next(err)
        })
})

router.put('/:id', valProjId, valUpdateProj, (req, res, next) => {
    Proj.update(req.params.id, req.body)
        .then(prj => {
            res.status(200).json(prj)
        })
        .catch(err => {
            next(err)
        })
})

router.delete('/:id', valProjId, (req, res, next) => {
    Proj.remove(req.params.id)
        .then(prj => {
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

  module.exports = router;