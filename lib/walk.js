const fs = require('fs')
const path = require('path')
function walk(dir, callback) {
    if(fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach( f => {
            let fullpath = path.join(dir, f)
            fs.statSync(fullpath).isDirectory() ?
                walk(fullpath, callback):
                callback(fullpath)
                
        })
    } else return undefined
}
module.exports = walk