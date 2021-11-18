var admin = require("firebase-admin");

var serviceAccount = require("./privatekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


async function getCompanyDoc(id) {
  var doc = undefined;
  if (("" + id).substring(0, 1) == "1") {
    doc = db.collection('partners').doc('companies').collection('hotels').doc(id)
  } else if (("" + id).substring(0, 1) == "2") {
    doc = db.collection('partners').doc('companies').collection('golfcourses').doc(id)
  } else if (("" + id).substring(0, 1) == "3") {
    doc = db.collection('partners').doc('companies').collection('flightcompanies').doc(id)
  } else if (("" + id).substring(0, 1) == "4") {
    doc = db.collection('partners').doc('companies').collection('transfercompanies').doc(id)
  } else if (("" + id).substring(0, 1) == "5") {
    doc = db.collection('partners').doc('companies').collection('carrentalcompanies').doc(id)
  }
  return doc;
}

async function getCompany(id) {
  return (await getCompanyDoc(id)).get()
}

async function createCompany() {

}

async function updateCompany(companyId, companyName, companyAddress, companyEmail, companyPhone) {
  console.log(companyId)
  console.log(companyName)
  console.log(companyAddress)
  console.log(companyEmail)
  console.log(companyPhone)
  const doc = await getCompanyDoc(companyId)
  console.log(doc)
  const newCompany = {
    companyName: companyName,
    companyAddress: companyAddress,
    companyEmail: companyEmail,
    companyPhone: companyPhone
  }
  doc.set(newCompany)
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
  const hotels = await getHotels();
  const flightCompanies = await getFlightCompanies();
  const golfCourses = await getGolfCourses();
  const transferCompanies = await getTransferCompanies();
  const carRentalCompanies = await getCarRentalCompanies();
  hotels.forEach(e => {
    list.push(e)
  });
  flightCompanies.forEach(e => {
    list.push(e)
  });
  golfCourses.forEach(e => {
    list.push(e)
  });
  transferCompanies.forEach(e => {
    list.push(e)
  });
  carRentalCompanies.forEach(e => {
    list.push(e)
  });
  console.log(list)
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
module.exports = { getCompanyDoc, getCompany, getHotels, getFlightCompanies, getGolfCourses, getTransferCompanies, getCarRentalCompanies, getAllCompanies, updateCompany}