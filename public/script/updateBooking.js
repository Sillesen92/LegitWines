const searchField = () => document.querySelector("#updateBookingSearchInput").value;
const searchBtn = document.querySelector("#updateBookingSearchButton");
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
            console.log(booking)
        }


    } catch (error) {
        console.log(error.message)
    }
}

searchBtn.onclick = getBookingInfo;