#!/usr/bin/env node
try {
    const path = require('path')
    const pkg = require(path.resolve('package.json'))
    const config = require('@toolio/config')
    if(config) {
        const chalk = require('chalk')
        const yargs = require('yargs')
        const PLUGINS = require('../lib/plugins')
        const COMMANDS = require('../lib/commands')
        const OPTIONS = require('../lib/options')
        const { version } = require('../package.json')
        yargs.usage('$0 <cmd> [args]')
        if(config.cli && config.cli.color && config.cli.color === 'none') { yargs.scriptName('toolio'); yargs.version(`Toolio CLI: v${version}`) } 
        else if(config.cli && config.cli.color && config.cli.color !== 'none') { yargs.scriptName(chalk[config.cli.color]('toolio')); yargs.version(chalk[config.cli.color](`Toolio CLI: v${version}`)) }
        if(PLUGINS.length) PLUGINS.forEach(plugin => { yargs.command(...plugin) })
        if(COMMANDS.length) COMMANDS.forEach(command => { yargs.command(...command) })
        if(OPTIONS.length) OPTIONS.forEach(option => { yargs.option(...option) }) 
        yargs.strictCommands(false)
        yargs.recommendCommands(true)
        yargs.demandCommand(1, 'You need at least one command before moving on.')
        if(config.cli && config.cli.help !== undefined) yargs.help(config.cli.help)
        yargs.argv
    } else { console.log('error: no toolio:cli configs detected'); process.exit() }
} catch(err) { console.error('error: directory doesn\'t seem to be a node program - no "package.json" file found'); process.exit() }