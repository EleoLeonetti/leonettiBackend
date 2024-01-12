function authentication(req, res, next) {
    if(req.session.user.role === 'admin' ){
        res.send('Rol: admin')
    }
    next()
}

//if(!req.session?.user?.admin){return res.status(401).send('Authentication Error') }

module.exports = {
    authentication
}