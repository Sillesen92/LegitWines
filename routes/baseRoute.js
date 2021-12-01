const express = require('express');
const router = express.Router();
router.get('/*', (req, resp, next) => {
    if (req.url != "/login" && req.url != "/") {
        if (req.session.userId == undefined) {
            resp.redirect("/login")
        } else {
            next()
        }
    } else {
        next()
    }
})
//  router.get('/', (req, resp) => {
// //         // if(req.session.userId){
// resp.render('../views/index', {loggedIn: true, userName: req.session.userName})
// //         // } else {
// //         //         resp.render('../views/loginpage', {loggedIn : false})
// //         // }
//  })

module.exports = router