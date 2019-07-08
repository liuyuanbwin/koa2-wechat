const baseUrl = "http://api.weixin.qq.com/"
const config = require('../../src/config')
const WxApi = {
    accessToken: baseUrl+"cgi-bin/token?grant_type=client_credential"
}
var koa2Req = require('koa2-request')
var fileHelper = require('./fileHelper')
const path = require('path')
const wechat_file = path.join(__dirname, './wechat.txt')
class WeChat{
    constructor(){
        var opts = {
            appId: config.wx.appid,
            appSecret: config.wx.appSecret,
            token: config.wx.token,
            getAccessToken: function() {
              return fileHelper.readFileAsync(wechat_file, 'utf-8')
            },
            saveAccessToken:function(data) {
              return fileHelper.writeFileAsync(wechat_file, data)
            }
          }
        this.appId = opts.appId
        this.appSecret = opts.appSecret
        this.getAccessToken = opts.getAccessToken
        this.saveAccessToken = opts.saveAccessToken
        this.log = function(){
            console.log('载入模块成功')
        }
        this.init()
    }

    async init(){
        let data = await this.getAccessToken();

        if(data && data.length != 0){
            data = JSON.parse(data)
            if(!this.isValidAccessToken(data)){
                data = await this.updateAccessToken()
            }
        }else{
            data = await this.updateAccessToken()
        }
        this.access_token = data.access_token
        this.expires_in = data.expires_in
        this.saveAccessToken(JSON.stringify(data))
    }

    isValidAccessToken(data){
        if(!data || !data.access_token || !data.expires_in){
            return false
        }
        return new Date().getTime() < data.expires_in ? true : false
    }

    updateAccessToken(){
        return new Promise(async (resolve, reject) => {
            var appId = this.appId
            var appSecret = this.appSecret
            console.log('wechat ' + WxApi.accessToken + "&appid=" + appId + "&secret=" + appSecret)
            var res = await koa2Req(WxApi.accessToken + "&appid=" + appId + "&secret=" + appSecret)
            console.log('请求到的 token ' + res.body)
            var data = JSON.parse(res.body)
            data.expires_in = new Date().getTime() + (data.expires_in - 20) * 1000
            resolve(data)
        })
    }
}
module.exports = WeChat
