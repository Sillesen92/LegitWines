var admin = require("firebase-admin");

var serviceAccount = require("./privatekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


async function getCompany(id) {
  var doc = undefined;
  if ((""+id).substring(0,1) == "1") {
    doc = db.collection('partners').doc('companies').collection('hotels').doc(id)
  } else if ((""+id).substring(0,1) == "2") {
    doc = db.collection('partners').doc('companies').collection('golfcourses').doc(id)
  } else if ((""+id).substring(0,1) == "3") {
    doc = db.collection('partners').doc('companies').collection('flightcompanies').doc(id)
  } else if ((""+id).substring(0,1) == "4") {
    doc = db.collection('partners').doc('companies').collection('transfercompanies').doc(id)
  } else if ((""+id).substring(0,1) == "5") {
    doc = db.collection('partners').doc('companies').collection('carrentalcompanies').doc(id)
  }
  const company = await doc.get()
  return company;
}

async function createCompany() {
  
}

async function saveCompany(id, company) {

}

async function getHotels() {
  const doc = db.collection('partners').doc('companies').collection('hotels');
  const list = (await doc.get()).docs
  return list;
}

async function getFlightCompanies() {
  const doc = db.collection('partners').doc('companies').collection('flightcompanies');
  const list = (await doc.get()).docs
  return list;
}

async function getGolfCourses() {
  const doc = db.collection('partners').doc('companies').collection('golfcourses');
  const list = (await doc.get()).docs
  return list;
}

async function getTransferCompanies() {
  const doc = db.collection('partners').doc('companies').collection('transfercompanies');
  const list = (await doc.get()).docs
  return list;
}

async function getCarRentalCompanies() {
  const doc = db.collection('partners').doc('companies').collection('carrentalcompanies');
  const list = (await doc.get()).docs
  return list;
}

async function getAllCompanies() {
  const list = []
  list.push(await getHotels())
  list.push(await getFlightCompanies())
  list.push(await getGolfCourses())
  list.push(await getTransferCompanies())
  list.push(await getCarRentalCompanies())
  return list
}

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
module.exports = {getCompany, getHotels, getFlightCompanies, getGolfCourses, getTransferCompanies, getCarRentalCompanies, getAllCompanies}