const express = require('express');
const router = express.Router();

router.get('/createReservation', async (req, resp) => {
    resp.render('createReservation')
})

router.post('/createReservation', async (req, resp) => {
    
    resp.sendStatus(200);
})


