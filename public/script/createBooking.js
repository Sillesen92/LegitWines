const button = document.querySelector('.addReservationButton');
const modal = document.querySelector("#resModal")
const span = document.querySelector(".closeResModal");

button.onclick = function () {
    modal.style.display = 'block';
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}