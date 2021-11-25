const button = document.querySelector('.addReservationButton');
const modal = document.querySelector("#resModal")
const span = document.querySelector(".closeResModal");
const resDropdown = document.querySelector("#reservationType")

// Åbner modal vindue for at kunne tilføje nye reservationer/contracts til en booking
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

// Åbner dropdown for at kunne søge på valgte company type
const companyTypeSearchButton = document.querySelector(".companyPickerButton")

companyTypeSearchButton.onclick = function () {
    document.querySelector(".companyPickerDropdownContent").classList.toggle("show");
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.querySelector("#companyInput");
    filter = input.value.toUpperCase();
    div = document.querySelector(".companyPickerDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}


