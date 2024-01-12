const { Router }         = require('express')
const { usersModel }     = require('../daos/Mongo/models/users.models')

const router = Router()

router.get('/', (req, res) =>{
        res.render('admin')
    
})

router.post('/register', async (req, res) =>{
    const {first_name, last_name, email, password} = req.body
    console.log(first_name, last_name, email, password)
    if(first_name === '' || email === '' || password === '' ){
       return res.send('Complete required fields')
    }

    const userFound = await usersModel.findOne({email})
    if(userFound){
        return res.send({status: 'error', error: 'The email is already registered'})
    }

    let roleValue = 'user'

    if (email === 'adminCoder@coder.com') {
        roleValue = 'admin'
    }

    const newUser = {
        first_name,
        last_name,
        email, 
        password,
        role: roleValue
    }
    const result = await usersModel.create(newUser)

    res.send({
        status: 'success',
        payload: {
            first_name: result.first_name,
            last_name: result.last_name,
            email: result.email,
            _id: result._id,
            role: result.role
        }
    })
})

router.post('/login', async (req, res) =>{
    const {email, password} = req.body
    if(email === '' || password === ''){
       return res.send('All fields must be completed')
    }

    const user = await usersModel.findOne({email})
    if(!user){
        return res.send('Wrong email or password')
    }

    if(password !== user.password){
        return res.send('Wrong password')
    }

    req.session.user = {
        user: user._id,
        first_name: user.first_name,
        role: user.role
    }
    if(user.role === 'admin'){
        res.redirect('/api/sessions')
    }else {
        console.log(req.session.message = `¡Bienvenid@, ${user.first_name}!`)
        res.redirect('/products');
    }
})


router.get('/logout', (req, res) => {
    req.session.destroy(err =>{
        if(err) return res.send({status: 'error', error: err})
    })
res.redirect('/')
})

module.exports = router