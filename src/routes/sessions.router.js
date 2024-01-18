const { Router } = require('express')
const passport   = require('passport')
const { usersModel } = require('../daos/Mongo/models/users.models')
const { createHash, isValidPassword } = require('../utils/hashPassword')

const router = Router()

//passport-local
router.post('/register', passport.authenticate('register', {failureRedirect: '/api/sessions/failregister'}),(req, res)=>{
    res.json({status: 'success', message: 'user created'})
})

router.get('/failregister', (req, res) =>{
    console.log('Fail strategy')
    res.send({status: 'error', error: 'Failed'})
})

router.post('/login', passport.authenticate('login',{failureRedirect: '/api/sessions/faillogin'}), async (req, res) => {
    if(!req.user) return res.status(400).send({status: 'error', error: 'Invalid credentials'})
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        role: req.user.role
    }
    if(req.user.email === 'adminCoder@coder.com'){
        return res.json({status: 'success', message: 'Admin'})
    }
    res.redirect('/products')
})

router.get('/faillogin', (req, res) => {
    res.send({error: 'Failed login'})
})

router.get('/logout', (req, res) => {
    req.session.destroy(err =>{
        if(err) return res.send({status: 'error', error: err})
    })
res.redirect('/')
})

//passport-github
router.get('/github', passport.authenticate('github', {scope: ['user: email']}), async (req, res) => {})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), (req, res) => {
    req.session.user = req.user
    res.redirect('/products')
})

module.exports = router