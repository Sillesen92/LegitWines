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

async function createCompany(companyName, companyAddress, companyEmail, companyPhone, companyType, contracts) {
  const company = {
    companyName: companyName,
    companyAddress: companyAddress,
    companyEmail: companyEmail,
    companyPhone: companyPhone,
    contracts: contracts
  }
  var created = false;
  var ref = db.collection('partners').doc('companies');
  if (companyType == "1") {
    const col = ref.collection('hotels')
    const count = await (await ref.get()).data().hotelcount
    const id = 10001 + count
    await (col.doc("" + id).set(company)).then(() => ref.update({ hotelcount: count + 1 })).then(() => created = true)
  }
  else if (companyType == "2") {
    const col = ref.collection('golfcourses')
    const count = await (await ref.get()).data().golfcoursecount
    const id = 20001 + count
    await (col.doc("" + id).set(company)).then(() => ref.update({ golfcoursecount: count + 1 })).then(() => created = true)
  }
  else if (companyType == "3") {
    const col = ref.collection('flightcompanies')
    const count = await (await ref.get()).data().flightcompanycount
    const id = 30001 + count
    await (col.doc("" + id).set(company)).then(() => ref.update({ flightcompanycount: count + 1 })).then(() => created = true)
  }
  else if (companyType == "4") {
    const col = ref.collection('transfercompanies')
    const count = await (await ref.get()).data().transfercompanycount
    const id = 40001 + count
    await (col.doc("" + id).set(company)).then(() => ref.update({ transfercompanycount: count + 1 })).then(() => created = true)
  }
  else if (companyType == "5") {
    const col = ref.collection('carrentalcompanies')
    const count = await (await ref.get()).data().carrentalcompanycount
    const id = 50001 + count
    await (col.doc("" + id).set(company)).then(() => ref.update({ carrentalcompanycount: count + 1 })).then(() => created = true)
  }
  else {
    throw "Fejl: Ingen partnertype valgt";
  }
  return created;
}

async function updateCompany(companyId, companyName, companyAddress, companyEmail, companyPhone, contracts) {
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
    companyPhone: companyPhone,
    contracts: contracts
  }
  console.log(newCompany)
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


//save og get sælgere:
async function createSalesman(salesmanName, salesmanEmail, salesmanPhoneNr, salesmanSalesId, salesmanPassword) {
  const salesman = {
    administrator: false,
    salesmanName: salesmanName,
    salesmanEmail: salesmanEmail,
    salesmanPhoneNr: salesmanPhoneNr,
    salesmanSalesId: salesmanSalesId,
    salesmanPassword: salesmanPassword
  }
  var created = false;
  var ref = db.collection('salesmen');
  const count = await (await ref.doc('count').get()).data().count
  const id = 60001 + count
  await (ref.doc("" + id).set(salesman)).then(() => ref.doc('count').update({ count: count + 1 })).then(() => created = true)
  return created
}

async function getSalesman(salesmanId) {
  if (("" + salesmanId).substring(0, 1) == "6") {
    const doc = db.collection('salesmen').doc(salesmanId)
    const salesman = await doc.get()
    return salesman;
  } else {
    return new Error('This is not a salesmanId')
  }
}


// returnerer alle bookings for en salesman, hvis datoerne / en dato er undefined tager den udgangspunkt fra det 
async function getAllBookingSalesman(salesmanId, dateFrom, dateTo) {
  if (("" + salesmanId).substring(0, 1) == "6") {
    let bookingsSalesman = []
    const doc = db.collection('booking')
    const bookings = await doc.get()
    bookings.forEach(element => {
      if (element.data().salesmanId == "" + salesmanId) {
        if (dateFrom == undefined && dateTo == undefined) {
          bookingsSalesman.push(element)
        } else if (dateTo == undefined) {
          if (element.data().date > dateFrom)
            bookingsSalesman.push(element)
        }
        else if (dateFrom == undefined) {
          if (element.data().date < dateTo)
            bookingsSalesman.push(element)
        }
        else {
          if (element.data().date > dateFrom && element.data().date < dateTo)
            bookingsSalesman.push(element)
        }
      }
    })
    return bookingsSalesman;
  } else {
    return new error('This is not a salesmanId')
  }
}


async function updateBooking(bookingNr, salesman, customer, travelDocuments) {
  const doc = await getBooking(bookingNr)
  if (doc.exists()) {
    const updatedBooking = {
      salesman: salesman,
      customer: customer,
      travelDocuments: travelDocuments
    }

    doc.update(updatedBooking)

  } else {
    console.log("booking does not exist")
  }
}
/*
Opretter booking, dernæst placeres travelDocuments i en subcollection på booking
*/

async function createBooking(salesman, customer, travelDocuments) {

  const year = new Date().getFullYear();
  const col = db.collection("bookings").doc(year);
  const count = await (await col.get()).data().count;
  const bookingNr = year + count;

  const booking = {
    bookingNr: bookingNr,
    salesman: salesman,
    customer: customer
  }

  const doc = await db.collection("bookings").doc(year)
  await doc.set(booking)
  const bookingToAddDoc = await getBooking(bookingNr)
  for (i = 0; i < travelDocuments.length; i++) {
    bookingToAddDoc.collection("travelDocuments").add(travelDocuments[i])
  }

  return doc

}
/* 
@params bookingNr
finder booking med bookingNr

*/

async function getBooking(bookingNr) {
  try {
    const year = bookingNr.substring(0, 4);

    const booking = await db.collection("bookings").doc(year).collection("bookings")
      .doc(bookingNr).get()

    return booking
  } catch (e) {
    console.log(e.message)
  }
}

//Henter alle bookings fra firestore
async function getBookings() {
  try {
    const querySnapshot = await db.collection("bookings").get();
    const docs = querySnapshot.docs
    console.log(docs.length)
    return docs
  } catch (e) {
    console.log(e.message)
  }

}
/*
@params year, hvilket år man vil hente alle bookinger fra
*/
async function getBookingForYear(year) {
  try {
    const querySnapshot = await db.collection("bookings").doc(year).collection("bookings").get();
    const docs = querySnapshot.docs
    return docs
  } catch (e) {
    console.log(e.message);
  }

}


module.exports = { getBooking, getCompanyDoc, getCompany, getHotels, getFlightCompanies, getGolfCourses, getTransferCompanies, getCarRentalCompanies, getAllCompanies, updateCompany, createCompany, createSalesman, getSalesman, getAllBookingSalesman, getBookings, createBooking, getBookingForYear, updateBooking }
