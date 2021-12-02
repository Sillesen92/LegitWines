const express = require('express');
const salesMenController = require('../controller/salesmen.js')
const router = express.Router();
router.get('/salesStats', async (req, resp) => {
  const salesmandoc = await salesMenController.getAllSalesmen();
  const salesmen = []

  salesmandoc.forEach(e => {
    if (e.id !== 'count') {
      var salesman = {
        id: e.id,
        name: e.data().salesmanName
      }
      salesmen.push(salesman)
    }
  });
  console.log(salesmen)
  resp.render('salesStats', { loggedIn: true, admin: req.session.admin, salesmen: salesmen })
})

router.post('/salesStat', async (req, resp) => {
  const { companyName, companyAddress, companyEmail, companyPhone, companyType } = req.body;
  await salesMenController.createCompany(companyName, companyAddress, companyEmail, companyPhone, companyType);
  resp.sendStatus(200);
})
module.exports = router