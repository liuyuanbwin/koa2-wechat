var fs = require('fs')

exports.readFileAsync = function(fpath,encoding){
    return new Promise((resolve, reject) => {
        fs.readFile(fpath, encoding, (err, content) => {
            if(err){
                reject(err)
            }
            resolve(content)
        })
    })
}

exports.writeFileAsync = function(fpath, content){
    return new Promise((resolve, reject) => {
        fs.writeFile(fpath, content, (err, content) => {
            if(err){
                reject(err)
            }
            resolve()
        })
    })
}