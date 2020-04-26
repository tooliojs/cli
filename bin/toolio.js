#!/usr/bin/env node
try {
    const config = require('@toolio/config')
    if(config) {
        const chalk = require('chalk')
        const yargs = require('yargs')
        // const PLUGINS = require('../lib/plugins')
        const COMMANDS = require('../lib/commands')
        // const OPTIONS = require('../lib/options')
        const { version } = require('../package.json')
        yargs.usage('$0 <cmd> [args]')
        if(config.cli && config.cli.color && config.cli.color === 'none') { yargs.scriptName('toolio'); yargs.version(`Toolio CLI: v${version}`) } 
        else if(config.cli && config.cli.color && config.cli.color !== 'none') { yargs.scriptName(chalk[config.cli.color]('toolio')); yargs.version(chalk[config.cli.color](`Toolio CLI: v${version}`)) }
        // if(PLUGINS.length) PLUGINS.forEach(plugin => { yargs.command(...plugin) })
        if(COMMANDS.length) COMMANDS.forEach(command => { yargs.command(...command) })
        // if(OPTIONS.length) OPTIONS.forEach(option => { yargs.option(...option) }) 
        yargs.strictCommands(true)
        yargs.demandCommand(1, 'You need at least one command before moving on.')
        if(config.cli && config.cli.help) yargs.help(config.cli.help)
        yargs.argv
    } else process.exit()
} catch(err) { console.error(new Error(err)); process.exit() }