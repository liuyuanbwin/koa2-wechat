const koa2Req = require('koa2-request')
//const wechat = require('../../util/wechat')
//import { WeChat } from '../../util/wechat.js'
const WeChat = require('../../util/wechat')

exports.getBack = async function(ctx, next){
    // var wechat = await import('../../util/wechat')
    var wechat = new WeChat()
     wechat.log()
     wechat.getAccessToken().then((tk) => {
        console.log('https://api.weixin.qq.com/cgi-bin/template/api_add_template?access_token=' + tk)
     var res =  koa2Req('https://api.weixin.qq.com/cgi-bin/template/api_add_template?access_token=' + tk)
     ctx.body = res
    console.log('back bakc back ')
     });
     
}