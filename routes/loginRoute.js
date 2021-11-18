
const express = require('express')
const session = require('express-session')
const router = express.Router()
const userController = require('../controller/users.js')

router.get('/login', (req, res) =>{
    res.render('../views/loginpage', {loggedIn:false})
})

router.get('/logout', (req,res)=>{
    req.sessionID.destroy(err=>{
        if(err){
            console.log(err)
        }else{
            response.redirect('/')
        }
    })
})

router.post('/login', async (req, res) =>{
    try{
        const {name, password} = req.body
        const user = await userController.getUser(name, password)
        if(user){
            req.session.userId = user.userId
            req.session.userName = user.userName
            res.sendStatus(200)
        }else{
            res.sendStatus(400)
        }
    }catch(error){
        res.sendStatus(400)
    }
})
module.exports = router