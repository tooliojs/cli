const path = require('path')
const walk = require('./walk')
const plugins = require('./plugins')

module.exports = function() {
    let config = require('@toolio/config')
    if(!config || config && !config.cli) { console.log('error: no configs detected'); process.exit() } 
    else if(!config.cli.entry || config.cli.entry && !config.cli.entry.commands) { console.log('error: no commands detected'); process.exit() }
    return function() {
        let commands = {
            path: path.resolve(config.cli.entry.commands),
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