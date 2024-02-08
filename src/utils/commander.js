const { Command } = require('commander')

const program = new Command()

program
    .option('--mode <mode>', 'Modo de manejo de entornos', 'production')
    .parse()

module.exports = { program }