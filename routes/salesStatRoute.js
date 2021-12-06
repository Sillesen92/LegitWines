const express = require('express');
const salesStatController = require('../controller/salesStat')
const router = express.Router();
const salesmanController = require('../controller/salesmen')
router.get('/salesStat', async (req, resp) => {
  try {
    const salesmenDB = await salesmanController.getAllSalesmen();
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
    const bookings = await salesmanController.getAllBookingSalesman(salesmanId);
    if (bookings) {
      console.log(bookings.data())
    }
    resp.status(200).send(bookings);

  } catch (error) {
    console.log(req.body)
    console.log(error.message)
  }

})
module.exports = router