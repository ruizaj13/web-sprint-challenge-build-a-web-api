const Proj = require('../projects/projects-model')
const Act = require('../actions/actions-model')

async function valPostId(req, res, next) {
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

module.exports = {valPostId}