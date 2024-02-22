const { connect }        = require('mongoose')
const dotenv             = require('dotenv')
const { program }        = require('../utils/commander.js')
const { MongoSingleton } = require('../utils/mongoSingleton.js')

const { mode } = program.opts()
console.log('mode config: ', mode)

dotenv.config({
    path: mode === 'production' ? './.env.production' : './.env.development'
})

const configObject = {
    PORT: process.env.PORT || 4000,
    mongo_url: process.env.MONGO_URL,
    jwt_secret_key: process.env.JWT_SECRET_KEY
}

const connectDb = async() => {
    MongoSingleton.getInstance(process.env.MONGO_URL)
} 

module.exports = {
    configObject,
    connectDb
}