const Proj = require('../projects/projects-model')
const Act = require('../actions/actions-model')

async function valProjId(req, res, next) {
    try {
        const prjct = await Proj.get(req.params.id)
        if (prjct) {
            req.prjct = prjct
            next()
        } else {
            res.status(404).json(`Project with ID: ${req.params.id} not found`)
        }
    } catch (err) {
        res.status(500).json('Something has gone terribly wrong')
    }
}

function valNewProj(req, res, next)  {
    req.body.name && req.body.description ? next() : res.status(400).json({error: 'please provide both name and description'})
}

function valUpdateProj(req, res, next) {
    req.body.name ||  req.body.description ? next() : res.status(400).json({error: 'please provide updated project data'})
}


async function valActId(req, res, next) {
    try {
        const action = await Act.get(req.params.id)
        if (action) {
            req.act = action
            next()
        } else {
            res.status(404).json(`Action with ID: ${req.params.id} not found`)
        }
    } catch (err) {
        res.status(500).json('Something has gone terribly wrong')
    }
}

function valNewAct(req, res, next)  {
    req.body.project_id && req.body.description && req.body.notes ? next() : res.status(400).json({error: 'please provide all required data'})
}

function valUpdateAct(req, res, next) {
    req.body.project_id || req.body.description || req.body.notes ? next() : res.status(400).json({error: 'please provide updated action data'})
}

module.exports = {valProjId, valNewProj, valUpdateProj, valActId, valNewAct, valUpdateAct}

