
const express = require('express')
const session = require('express-session')
const router = express.Router()
const salesmenController = require('../controller/salesmen.js')


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
        const user = await salesmenController.getSalesman(name)
        
        
        if(user && user.data().salesmanPassword == password){
            console.log("Du er logged ind")
            console.log(user.data())
            console.log(user.data().salesmanSalesId)            
            req.session.userId = user.data().salesmanSalesId
            req.session.name = user.data().salesmanName            
            console.log(req.session.name)
            console.log(req.session.userId)
            req.session.isAuth = true;
            res.sendStatus(200)           
        }else{
            res.sendStatus(400)
        }
    }catch(error){
        console.log("Catch clausen")
        console.log(error.message)
        res.sendStatus(400)
    }
})
module.exports = router