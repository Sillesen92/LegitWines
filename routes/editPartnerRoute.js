const express = require('express');
const partnerController = require('../controller/partners.js')
const router = express.Router();

router.get('/editPartner/:id', async (req, resp) => {
    const companyPartner = await partnerController.getCompany(req.params.id)
    resp.render('editPartner', { companyPartner })
})

router.put('/editPartner/:id', async (req, resp) => {
    const { companyName, companyAddress, companyEmail, companyPhone } = req.body;
    await partnerController.updateCompany(req.params.id, companyName, companyAddress, companyEmail, companyPhone);
    resp.sendStatus(200);
})

module.exports = router