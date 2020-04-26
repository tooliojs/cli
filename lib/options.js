const path = require('path')
const walk = require('./walk')
const plugins = require('./plugins')
const config = require('@acidjs/config').cli
module.exports = function() {
    return function() {
        let options = {
            path: path.resolve(config.entry.options),
            all: [],
            resolved: []
        }
        walk(options.path, (file) => {
            let option = require(file)
            // run a schema validation
            if(option.length) options.all.push(option)
        })
        if(!plugins.length) return options.all
        else {
            options.all.forEach(option => {
                let resolved
                if(plugins.length) {
                    plugins.forEach(plugin => {
                        option[0].split(' ')[0] === plugin[0].split(' ')[0] ? 
                        resolved = false : 
                        resolved = true
                    })
                } 
                if(resolved) options.resolved.push(option)
            })
            return options.resolved
        }
    }()
}()