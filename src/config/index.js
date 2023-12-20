const { connect } = require('mongoose')

exports.connectDb = async() => {
    await connect('mongodb+srv://eleonetti:kHpGxq3spyt4SfHJ@cluster0.soxzojq.mongodb.net/ecommerce?retryWrites=true&w=majority')
    console.log('Database connected')
} 