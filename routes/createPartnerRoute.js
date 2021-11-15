const express = require('express');
const partnerController = require('../controller/partners.js')
const router = express.Router();
router.get('/createPartner', async (req, resp) => {
        resp.render('createPartner')
})

router.post('/createPartner', async (req, resp) => {
        const {companyName, companyAddress, companyEmail, companyPhone, companyType} = req.body;
        await partnerController.createCompany(companyName, companyAddress, companyEmail, companyPhone, companyType);
        resp.sendStatus(200);
})
module.exports = router