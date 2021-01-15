const Proj = require('../projects/projects-model')
const Act = require('../actions/actions-model')

async function valProjId(req, res, next) {
    try {
        const prjct = await Proj.get(req.params.id)
        if (prjct) {
            req.prjct = prjct
            next()
        } else {
            res.status(404).json(`User with id ${req.params.id} not found`)
        }
    } catch (err) {
        res.status(500).json('Something has gone terribly wrong')
    }
}

function valNewProj(req, res, next)  {
    req.body.name || req.body.description ? next() : res.status(400).json({error: 'please provide updated data'})
}

module.exports = {valProjId, valNewProj}