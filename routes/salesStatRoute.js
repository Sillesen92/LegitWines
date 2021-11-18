const express = require('express');
const salesStatController = require('../controller/salesStat.js')
const router = express.Router();
router.get('/salesStat', async (req, resp) => {
  resp.render('salesStat')
})

router.post('/salesStat', async (req, resp) => {
  const { companyName, companyAddress, companyEmail, companyPhone, companyType } = req.body;
  await salesStatController.createCompany(companyName, companyAddress, companyEmail, companyPhone, companyType);
  resp.sendStatus(200);
})
module.exports = router