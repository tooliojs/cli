const path = require('path')
const walk = require('./walk')
const plugins = require('./plugins')

module.exports = function() {
    let config = require('@toolio/config')
    if(!config || config && !config.cli) { console.log('error: no configs detected'); process.exit() } 
    else if(!config.cli.entry || config.cli.entry && !config.cli.entry.options) { console.log('error: no options detected'); process.exit() }
    return function() {
        let options = {
            path: path.resolve(config.cli.entry.options),
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