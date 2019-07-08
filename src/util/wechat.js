const baseUrl = "http://api.weixin.qq.com/"
const WxApi = {
    accessToken: baseUrl+"cgi-bin/token?grant_type=client_credential"
}
var koa2Req = require('koa2-request')
class WeChat{
    constructor(opts){
        this.appId = opts.appId
        this.appSecret = opts.appSecret
        this.getAccessToken = opts.getAccessToken
        this.saveAccessToken = opts.saveAccessToken
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
            var res = await koa2Req(WxApi.accessToken + "&appid=" + appId + "&secret=" + appSecret)
            var data = JSON.parse(res.body)
            data.expires_in = new Date().getTime() + (date.expires_in - 20) * 1000
            resolve(data)
        })
    }
}