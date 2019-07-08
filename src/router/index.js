// index router
const Router = require('koa-router')
const controller = require('../controller')
const back = require('../controller/backend/modelmsg')
const router = new Router()

router
    .get('/', controller.getHandle)
    .post('/', controller.postHandle)
    .get('/back', back.getBack)

module.exports = router