const koa2Req = require('koa2-request')
const token = require('../../util/wechat')


exports.getBack = async function(ctx, next){
    var res = await koa2Req('https://api.weixin.qq.com/cgi-bin/template/api_add_template?access_token=' + token().getAccessToken())
    ctx.body = res
}