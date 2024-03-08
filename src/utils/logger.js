const winston = require('winston');
const { program } = require('./commander.js');
const {mode} = program.opts()

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4,
        http: 5
    },
    colors: {
        fatal: 'red',
        error: 'yellow',
        warning: 'yellow',
        info: 'blue',
        debug: 'white'
    }
}

const transportOption = {
    development: [
      new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
          winston.format.colorize({colors: customLevelOptions.colors}),
          winston.format.simple()
        )
      }),
    ],
    production: [
      new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
          winston.format.colorize({colors: customLevelOptions.colors}),
          winston.format.simple()
        )
      }),
      new winston.transports.File({
        filename: './errors.log',
        level: 'error',
        format: winston.format.simple()
      })
    ]
  }

  const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: transportOption[mode]
  })

const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.info(`${req.method} en ${req.url} - ${new Date()}`);
    next();
}

module.exports = {
    logger,
    addLogger
}
