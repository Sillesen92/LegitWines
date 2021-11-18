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

async function createCompany(companyName, companyAddress, companyEmail, companyPhone, companyType) {
  const company = {
    companyName: companyName,
    companyAddress: companyAddress,
    companyEmail: companyEmail,
    companyPhone: companyPhone
  }
  var created = false;
  var ref = db.collection('partners').doc('companies');
  if (companyType == "1") {
    const col = ref.collection('hotels')
    const count = await (await ref.get()).data().hotelcount
    const id = 10001+count
    await (col.doc(""+id).set(company)).then(() => ref.update({hotelcount: count+1})).then(() => created = true)
  } 
  else if (companyType == "2") {
    const col = ref.collection('golfcourses')
    const count = await (await ref.get()).data().golfcoursecount
    const id = 20001+count
    await (col.doc(""+id).set(company)).then(() => ref.update({golfcoursecount: count+1})).then(() => created = true)
  } 
  else if (companyType == "3") {
    const col = ref.collection('flightcompanies')
    const count = await (await ref.get()).data().flightcompanycount
    const id = 30001+count
    await (col.doc(""+id).set(company)).then(() => ref.update({flightcompanycount: count+1})).then(() => created = true)
  } 
  else if (companyType == "4") {
    const col = ref.collection('transfercompanies')
    const count = await (await ref.get()).data().transfercompanycount
    const id = 40001+count
    await (col.doc(""+id).set(company)).then(() => ref.update({transfercompanycount: count+1})).then(() => created = true)
  } 
  else if (companyType == "5") {
    const col = ref.collection('carrentalcompanies')
    const count = await (await ref.get()).data().carrentalcompanycount
    const id = 50001+count
    await (col.doc(""+id).set(company)).then(() => ref.update({carrentalcompanycount: count+1})).then(() => created = true)
  } 
  else {
    throw "Fejl: Ingen partnertype valgt";
  }
  return created;
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
async function updateBooking(bookingNr, grossPrice, contributionMargin, salesman, reservations, transfers, customer, customers, carRentals, greenFees){
  const doc = await getBooking(bookingNr)
  const updatedBooking = {
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
  const bookingJson = JSON.stringify(updatedBooking)
  await doc.set(bookingJson)
  return doc
}


async function createBooking(bookingNr, grossPrice, contributionMargin, salesman, reservations, transfers, customer, customers, carRentals, greenFees){
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
  
}const doc = await db.collection("bookings").doc()
await doc.set(booking)

return doc.id

}
//Henter specific booking på bookingNr

async function getBooking(bookingNr){
  try{
    const querySnapshot = await db.collection("bookings")
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
    const querySnapshot = await db.collection("bookings").get();
    const docs = querySnapshot.docs
    console.log(docs.length)
    return docs  
  }catch(e){
    console.log(e.message)
  }
  
}

module.exports = {getBookings, saveBooking}*/
module.exports = { getCompanyDoc, getCompany, getHotels, getFlightCompanies, getGolfCourses, getTransferCompanies, getCarRentalCompanies, getAllCompanies, updateCompany, createCompany}