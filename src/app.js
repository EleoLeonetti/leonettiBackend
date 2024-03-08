const express       = require("express")
const appRouter     = require('./routes')
const handlebars    = require('express-handlebars')
const mongoStore    = require('connect-mongo')
const cookieParser  = require('cookie-parser')
const session       = require('express-session')
const passport      = require('passport')
const { connectDb, configObject } = require("./config")
const { Server }    = require('socket.io')
const { chatModel, messageModel } = require('./daos/Mongo/models/chat.models.js')
const { initializePassport, initializePassportGit }      = require("./config/passport.config.js")
const cors = require('cors')
const { addLogger, logger } = require("./utils/logger.js")

const app        = express()
const PORT       = configObject.PORT
const httpServer = app.listen(PORT, err => {
    if (err) logger.fatal(err)
    logger.info(`Server listening in port: ${PORT}`)
})
const io = new Server(httpServer)

connectDb()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./src/public'))
app.use(cookieParser('p@l@br@Secret@'))
app.use(cors())


initializePassport()
app.use(passport.initialize())

app.use(addLogger)

//Traigo archivo de configuración de rutas
app.use(appRouter)

//Configuración handlebars
app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}));
app.set('view engine', '.hbs')
app.set('views', './src/views')

//Configuración del chat con socket (llevar a otro archivo?)
io.on('connection', socket => {
    logger.info('New client connected')
    socket.on('message', async (data) => {
        const { user, message } = data
        const newMessage = new messageModel({
                user: user,
                message: message
            });
        await newMessage.save()
        io.emit('messageLogs', newMessage)
    })
})