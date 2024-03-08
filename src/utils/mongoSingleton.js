const { connect } = require('mongoose')
const { logger } = require('../utils/logger.js')

class MongoSingleton {
    static instance
    constructor (url){
        connect(url)
    }
    static getInstance (url){
        if(this.instance){
            logger.info('Database already connected')
            return this.instance
        }
        this.instance = new MongoSingleton(url)
        logger.info('Database connected')
        return this.instance
    }
}

module.exports = {
    MongoSingleton
}