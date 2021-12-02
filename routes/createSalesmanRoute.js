const express = require('express');
const salesmanController = require('../controller/salesmen.js')
const router = express.Router();

router.get('/createSalesman', async (req, resp) => {
        resp.render('createSalesman', { loggedIn: true, admin: req.session.admin })
})

router.post('/createSalesman', async (req, resp) => {
        try {
                const { salesmanName, salesmanEmail, salesmanPhoneNr, salesmanSalesId, salesmanPassword } = req.body;
                const createSuccess = await salesmanController.createSalesman(salesmanName, salesmanEmail, salesmanPhoneNr, salesmanSalesId, salesmanPassword);
                if (createSuccess) {
                        resp.sendStatus(200);
                } else {
                        resp.status(400).json({ error: "Fejl under oprettelse af sælger" });
                }
        } catch (error) {
                console.log(error)
                resp.status(400).json(error);
        }
})
module.exports = router