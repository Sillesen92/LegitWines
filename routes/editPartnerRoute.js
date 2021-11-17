const express = require('express');
const partnerController = require('../controller/partners.js')
const router = express.Router();

router.get('/editPartner/:id', async (req, resp) => {
    const companyPartner = await partnerController.getPartner(req.params.id)
    resp.render('editPartner', { companyPartner })
})

router.put('/editPartner/:id', (req, resp) => {
    /* TODO: Lav metode der henter params fra document.querySelector og opdaterer objektet med de nye attributter.*/
})

module.exports = router