const searchField = () => document.querySelector("#updateBookingSearchInput").value;
const table = document.querySelector("#kontraktInfoTable")
const searchBtn = document.querySelector("#updateBookingSearchButton");
const travelDocArea = document.querySelector("#travelDocArea");
const salesmanDiv = document.querySelector("#salesmanID").value;
// const bookingController = require('../../controller/bookings');

async function getBookingInfo() {

    try {
        const response = await fetch("/editBooking", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({ bookingNr: searchField() })
        })
        if (response.ok) {
            const booking = await response.json();
            console.log(booking.salesman)

            console.log(booking.travelDocuments[0])
            salesmanDiv.innerHTML += booking.salesman
        }


    } catch (error) {
        console.log("Skete en fejl, her er med:  " + error.message)
    }
}

searchBtn.onclick = getBookingInfo;