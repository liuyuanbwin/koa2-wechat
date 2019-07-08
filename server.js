const Koa = require('koa')
const config = require('./src/config')
const logger = require('./src/middleware/logger')
const xmlParse = require('./src/middleware/xmlParse')
const router = require('./src/router')
const app = new Koa()

const path = require('path')
const fileHelper = require('./src/util/fileHelper')
const wechat_file = path.join(__dirname, './wechat.txt')

app
  .use(logger())
  .use(xmlParse())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(config.port)
console.log('server start at port:', config.port)