const passport = require('passport')
const jwt      = require('passport-jwt')

const JWTStrategy = jwt.Strategy
const ExtractJWT  = jwt.ExtractJwt

exports.initializePassport = () => {
    const cookieExtractor = req => {
        let token = null
        if(req && req.cookies) {
            token = req.cookies['token']
        }
        return token
    }

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'CoderSecretoJsonWebToken'
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    } ))
}