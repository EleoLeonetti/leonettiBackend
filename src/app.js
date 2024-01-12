const express       = require("express")
const appRouter     = require('./routes')
const { connectDb } = require("./config")
const handlebars    = require('express-handlebars')
const { Server }    = require('socket.io')
const cookieParser  = require('cookie-parser')
const session       = require('express-session')
const mongoStore    = require('connect-mongo')
const { chatModel, messageModel } = require('./daos/Mongo/models/chat.models.js')

const app        = express()
const PORT       = 8080
const httpServer = app.listen(PORT, err => {
    if (err) console.log(err)
    console.log(`Server listening in port: ${PORT}`)
})
const io = new Server(httpServer)

//Conexión a base de datos
connectDb()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./src/public'))
app.use(cookieParser('KgiKpiGVfBMuYcU'))
app.use(session({
    store: mongoStore.create({
        mongoUrl: 'mongodb+srv://eleonetti:kHpGxq3spyt4SfHJ@cluster0.soxzojq.mongodb.net/ecommerce?retryWrites=true&w=majority',
        mongoOptions: {
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
        },
        ttl: 15000000000,
    }),
    secret: 'secretCoder',
    resave: true,
    saveUninitialized: true
}))

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
    console.log('New client connected')
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