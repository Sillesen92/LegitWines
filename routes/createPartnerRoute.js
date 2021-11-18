const express = require('express');
const partnerController = require('../controller/partners.js')
const router = express.Router();

router.get('/createPartner', async (req, resp) => {
        resp.render('createPartner')
})

router.post('/createPartner', async (req, resp) => {
        try {
                const {companyName, companyAddress, companyEmail, companyPhone, companyType} = req.body;
                const createSuccess = await partnerController.createCompany(companyName, companyAddress, companyEmail, companyPhone, companyType);
                if (createSuccess) {
                        resp.sendStatus(200);
                } else {
                        resp.status(400).json({error: "Fejl under oprettelse af samarbejdspartner"});
                }
        } catch (error) {
                console.log(error)
                resp.status(400).json(error);
        }
})
module.exports = router