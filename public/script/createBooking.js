const button = document.querySelector('.addReservationButton');

function openWindow(){
    window.open('localhost:3600/createReservation');
}

button.onclick = openWindow;