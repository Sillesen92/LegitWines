const express = require('express');
const router = express.Router();

router.get('/createReservation', async (req, resp) => {
    resp.render('createReservation', { loggedIn: true, admin: req.session.admin })
})

router.post('/createReservation', async (req, resp) => {

    resp.sendStatus(200);
})


