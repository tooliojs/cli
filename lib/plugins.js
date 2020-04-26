const path = require('path')
const config = require('@toolio/config')
const { dependencies } = require(path.resolve('package.json')) 

let plugins

function setplugin(plugin, callback) {
    let resolved
    let set = false
    for(dependency in dependencies) {
        if(plugin === dependency) {
            set = true
            resolved = require(plugin)
        }
    }
    set ? callback({ set, resolved }) : callback(set)
}

module.exports = function() {
    if(config && config.cli && config.cli.plugins && config.cli.plugins.length && typeof config.cli.plugins !== 'string') plugins = config.cli.plugins
    return function() {
        let resolvedPlugins = []
        if(plugins) {
            for(plugin in plugins) {
                setplugin(plugins[plugin], (_plugin) => {
                    resolvedPlugins.push(_plugin.resolved)
                })
            }
        } else return []
        return resolvedPlugins
    }()
}()