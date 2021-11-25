const button = document.querySelector('.addReservationButton');
const modal = document.querySelector("#resModal")
const modalContent = document.querySelector(".resModalContent")
const renderContent = document.querySelector(".renderContent")
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

//viser nødvendige informationer for opret hotel
function renderModal(){
    renderContent.innerHTML = ""
    if(resDropdown.value == "Hotel"){
        //datepicker indtjekningsdato
        const dateIn = document.createElement("input")
        dateIn.type = "date"
        dateIn.id = "dateIn"
        renderContent.append(dateIn)

        //datepicker udtjekningsdato
        const dateOut = document.createElement("input")
        dateOut.type = "date"
        dateOut.id = "dateOut"
        renderContent.append(dateOut)

        //dropdown for pension
        const pension = document.createElement("select")
        pension.id = "pensionPicker"
        pension.appendChild(new Option("Ingen"));
        pension.appendChild(new Option("Halv-Pension"));
        pension.appendChild(new Option("Hel-Pension"));
        renderContent.append(pension)

        //kommentarfelt
        const commentInput = document.createElement("Input")
        commentInput.type = "text"
        commentInput.id = "commentInput"
        renderContent.append(commentInput)

    } else if(resDropdown.value == "Passager"){
        
    }else if(resDropdown.value == "Flyafgang"){

    }else if(resDropdown.value == "Transfer"){ }
    else if(resDropdown.value == "Billeje"){}
    else if(resDropdown.value == "Greenfee"){}
    else{}
    
    // modal.innerHTML += "<input type = 'date' id = 'datepickerIn'></input>"
    // modal.innerHTML += "<input type = 'date' id = 'datepickerOut'></input>"
    // modal.innerHTML += "<>"
}

