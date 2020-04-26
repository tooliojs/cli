const path = require('path')
const plugins = require('@acidjs/config').cli.plugins
const { dependencies } = require(path.resolve('package.json')) 

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
    return function() {
        let resolvedPlugins = []
        if(plugins.length) {
            for(plugin in plugins) {
                setplugin(plugins[plugin], (_plugin) => {
                    resolvedPlugins.push(_plugin.resolved)
                })
            }
        } else return []
        return resolvedPlugins
    }()
}()