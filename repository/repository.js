var admin = require("firebase-admin");

var serviceAccount = require("./privatekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

//Mangler de gyldige parametre
/*
async function saveBooking(bookingNr, grossPrice, contributionMargin, salesman, reservations, transfers, customer, customers, carRentals, greenFees){
  {
    const booking = {
      bookingNr = bookingNr,
      grossPrice = grossPrice,
      contributionMargin = contributionMargin,
      salesman = salesman,
      reservations = reservations,
      transfers = transfers,
      customer = customer,
      passengers = passengers,
      carRentals = carRentals,
      greenFees = greenFees
  }
  const bookingJson = JSON.stringify(booking)
  
}const doc = await db.collection("Bookings").doc()
await doc.set(booking)
return doc.id

}
//Henter specific booking på bookingNr

async function getBooking(bookingNr){
  try{
    const querySnapshot = await db.collection("Bookings")
    .where("bookingNr", "==", bookingNr).get()
    const docs = querySnapshot.docs 
    return docs
  }catch(e){
    console.log(e.message)
  }
}

//Henter alle bookings fra firestore
async function getBookings(){
  try{
    const querySnapshot = await db.collection("Bookings").get();
    const docs = querySnapshot.docs
    console.log(docs.length)
    return docs  
  }catch(e){
    console.log(e.message)
  }
  
}

module.exports = {getBookings, saveBooking}*/