const passport       = require('passport')
const local          = require('passport-local')
const githubStrategy = require('passport-github2')
const userDaoMongo   = require('../daos/Mongo/userDaoMongo.js')
const { createHash, isValidPassword } = require('../utils/hashPassword.js')

const LocalStrategy = local.Strategy
const userService   = new userDaoMongo()

exports.initializePassport = () => {
//passport local
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async(req, username, password, done) =>{
        try {
            const { first_name, last_name, email } = req.body
            let userFound = await userService.getUserBy({email: username})
            if(userFound) return done('Email is already registered', false)

            let newUser ={
                first_name,
                last_name,
                email: username,
                password: createHash(password)
            }
            let result = await userService.createUser(newUser)
            return done(null, result)

        } catch (error) {
            return done('Error. Cannot create user'+ error)
        }
    }))
    
    //Para almacenar y recuperar credenciales del usuario de session
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser(async (id, done) => {
        let user = await userService.getUserBy({_id: id})
        done(null, user)
    })
    
    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async(username, password, done) => {
        try {
            const user = await userService.getUserBy({email: username})
            if(!user) {
                console.log('User not found')
                return done('Wrong email or password', false)
            }
            if(!isValidPassword(password, {password: user.password})) return done(null, false)
            return done(null, user)
        } catch (error) {
            return done(error)
        }
        
    }))
 
}

exports.initializePassportGit = () => {
    passport.use('github', new githubStrategy({
        clientID: 'Iv1.d4c18da4edbc46aa', 
        clientSecret: 'a9c8994dee1fd4e93896e47a37c461e836350716',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    }, async(accesToken, refreshToken, profile, done) => {
        try {
            console.log(profile)
            let user = await userService.getUserBy({email: profile._json.email})
            if(!user){
                //No existe usuario, hacer registro
                let userNew = {
                    first_name: profile.username,
                    last_name: profile.username,
                    email: profile._json.email,
                    password: 'xxxx'
                }
                let result = await userService.createUser(userNew)
                return done(null, result)
            }
            done(null, user) 
        } catch (error) {
            return done(error)   
        }
    }))   
}