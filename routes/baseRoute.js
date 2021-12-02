const express = require('express');
const router = express.Router();
router.get('/*', (req, resp, next) => {
    if (req.url != "/login" && req.url != "/") {
        if (req.session.userId == undefined) {
            resp.render('../views/frontPage.pug', { loggedIn: false, admin: req.session.admin });
        } else {
            next()
        }
    } else {
        next()
    }
})

module.exports = router