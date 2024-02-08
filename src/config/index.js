const { connect } = require('mongoose')
const dotenv      = require('dotenv')
const { program } = require('../utils/commander.js')

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
    await connect(process.env.MONGO_URL)
    console.log('Database connected')
} 

module.exports = {
    configObject,
    connectDb
}