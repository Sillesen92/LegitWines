var admin = require("firebase-admin");

var serviceAccount = require("./privatekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

console.log("hej kriller");

//Mangler de gyldige parametre
async function saveBooking(bookingNr){
  {
    const booking = {
      bookingNr = bookingNr,
  }
}const doc = await db.collection("Bookings").doc()
await doc.set(booking)
return doc.id

}
//Henter specific booking på bookingId

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

module.exports = {getBookings, saveBooking}