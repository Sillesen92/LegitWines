const express = require('express');
const router = express.Router();
router.get('/', (req, resp) => {
        // if(req.session.userId){
        resp.render('../views/index', {loggedIn: true, userName: req.session.userName})
        // } else {
        //         resp.render('../views/loginpage', {loggedIn : false})
        // }
})
module.exports = router