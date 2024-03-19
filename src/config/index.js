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
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    gmail_user: process.env.GMAIL_USER,
    gmail_password: process.env.GMAIL_PASSWORD
}

const connectDb = async() => {
    MongoSingleton.getInstance(process.env.MONGO_URL)
} 

module.exports = {
    configObject,
    connectDb
}