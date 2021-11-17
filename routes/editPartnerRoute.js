const express = require('express');
const partnerController = require('../controller/partners.js')
const router = express.Router();

router.get('/editPartner/:id', async (req, resp) => {
    const companyPartner = await partnerController.getPartner(req.params.id)
    resp.render('editPartner', { companyPartner })
})

router.put('/editPartner/:id', async (req, resp) => {
    const { companyName, companyAddress, companyEmail, companyPhone, companyType } = req.body;
    await partnerController.updateCompany(companyName, companyAddress, companyEmail, companyPhone, companyType);
    resp.sendStatus(200);
})

module.exports = router