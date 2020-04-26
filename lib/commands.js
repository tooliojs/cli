const path = require('path')
const walk = require('./walk')
const plugins = require('./plugins')
const config = require('@acidjs/config').cli
module.exports = function() {
    return function() {
        let commands = {
            path: path.resolve(config.entry.commands),
            all: [],
            resolved: []
        }
        walk(commands.path, (file) => {
            let command = require(file)
            // run a schema validation
            if(command.length) commands.all.push(command)
        })
        if(!plugins.length) return commands.all
        else {
            commands.all.forEach(command => {
                let resolved
                if(plugins.length) {
                    plugins.forEach(plugin => {
                        command[0].split(' ')[0] === plugin[0].split(' ')[0] ? 
                        resolved = false : 
                        resolved = true
                    })
                } 
                if(resolved) commands.resolved.push(command)
            })
            return commands.resolved
        }
    }()
}()