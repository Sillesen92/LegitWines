const express = require('express');
const router = express.Router();
const salesMenController = require('../controller/salesmen')
router.get('/salesStat', async (req, resp) => {
  try {
    const salesmenDB = await salesMenController.getAllSalesmen();
    salesmenDB.forEach(element => {
      console.log("navn på salgsmand " + element.data().salesmanName)
    })
    resp.render('salesStats', { salesmen: salesmenDB })
  } catch (error) {
    console.log(error.message)
  }

}
)

router.post('/salesStat', async (req, resp) => {
  try {
    const { salesmanId } = req.body
    console.log(salesmanId)
    const bookings = await salesMenController.getAllBookingSalesman(salesmanId);
    if (bookings) {
      console.log(bookings.data())
    }
    resp.status(200).send(bookings);

  } catch (error) {
    console.log(req.body)
    console.log(error.message)
  }
}
)


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