const express = require('express');
const partnerController = require('../controller/partners.js')
const router = express.Router();

router.get('/editPartner', async (req, res) => {
    res.render("showPartners");

})

router.post('/editPartner', async (req, res) => {
    const { companyType } = req.body;
    console.log(companyType)
    var partners = undefined;
    if (companyType == "Hotel") {
        partners = await partnerController.getHotels();
    }
    else if (companyType == "Flyselskab") {
        partners = await partnerController.getFlightCompanies();
    }
    else if (companyType == "Billeje") {
        partners = await partnerController.getCarRentalCompanies();
    }
    else if (companyType == "Golfbane") {
        partners = await partnerController.getGolfCourses();
    }
    else if (companyType == "Transfer") {
        partners = await partnerController.getTransferCompanies();
    } else {
        partners = await partnerController.getAllCompanies();
    }
    console.log(partners)
    const jsonPartners = []
    partners.forEach(p => {
        if (p != undefined) {
            const obj = {
                companyName: p.data().companyName,
                companyAddress: p.data().companyAddress,
                companyPhone: p.data().companyPhone,
                companyEmail: p.data().companyEmail,
                companyId: p.id
            }
            jsonPartners.push(obj)
        }
    });
    res.status(200).json(jsonPartners)
})

router.get('/editPartner/:id', async (req, resp) => {
    const companyPartner = await partnerController.getCompany(req.params.id)
    resp.render('editPartner', { companyPartner: companyPartner })
})

router.put('/editPartner/:id', async (req, resp) => {
    try {
        const { companyName, companyAddress, companyEmail, companyPhone } = req.body;
        console.log(req.params.id)
        await partnerController.updateCompany(req.params.id, companyName, companyAddress, companyEmail, companyPhone);
        resp.sendStatus(200);
    } catch (error) {
        resp.sendStatus(400);
    }

})

module.exports = router