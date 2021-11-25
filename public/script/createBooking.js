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

        //dropdown for kontrakter
        const contracts = document.createElement("select")
        contracts.id = "contractPicker"
        contracts.appendChild(new Option("--Vælg--"));
        contracts.appendChild(new Option("contract 1"));
        contracts.appendChild(new Option("contract 2"));
        renderContent.append(contracts)

    } else if(resDropdown.value == "Passager"){
        //tekstfelt til fornavn
        const firstName = document.createElement("input")
        firstName.id = "firstName"
        firstName.type = "text"
        renderContent.append(firstName);
        
        //tekstfelt til efternavn
        const lastName = document.createElement("input")
        lastName.id = "lastName"
        lastName.type = "text"
        renderContent.append(lastName);

        //dropdown til køn
        const gender = document.createElement("select")
        gender.id = "genderPicker"
        gender.appendChild(new Option("Mand"))
        gender.appendChild(new Option("Kvinde"))
        renderContent.append(gender)

    }else if(resDropdown.value == "Flyafgang"){
        //dropdown til tur derned eller retur
        const turRetur = document.createElement("select")
        turRetur.id = "turReturPicker"
        turRetur.appendChild(new Option("tur"))
        turRetur.appendChild(new Option("Retur"))
        renderContent.append(turRetur)

        //Dato
        const date = document.createElement("input")
        date.type = "date"
        date.id = "date"
        renderContent.append(date)

        //dropdown til all flyafgange
        const flights = document.createElement("select")
        flights.id = "flightPicker"
        flights.appendChild(new Option("fly1"))
        renderContent.append(flights)

        //dropdown for kontrakter
        const contracts = document.createElement("select")
        contracts.id = "contractPicker"
        contracts.appendChild(new Option("--Vælg--"));
        contracts.appendChild(new Option("contract 1"));
        contracts.appendChild(new Option("contract 2"));
        renderContent.append(contracts)

    }else if(resDropdown.value == "Transfer"){
        //Dato og tid via datetimepicker
        const date = document.createElement("input")
        date.type = "datetime-local"
        date.id = "dateTime"
        renderContent.append(date)

        //destiantion tekstfelt
        const destination = document.createElement("input")
        destination.id = "destination"
        destination.type = "text"
        renderContent.append(destination);

        //dropdown for kontrakter
        const contracts = document.createElement("select")
        contracts.id = "contractPicker"
        contracts.appendChild(new Option("--Vælg--"));
        contracts.appendChild(new Option("contract 1"));
        contracts.appendChild(new Option("contract 2"));
        renderContent.append(contracts)
    }
    else if(resDropdown.value == "Billeje"){
        //datepicker dato fra
        const dateFrom = document.createElement("input")
        dateFrom.type = "date"
        dateFrom.id = "dateFrom"
        renderContent.append(dateFrom)

        //datepicker dato til
        const dateTo = document.createElement("input")
        dateTo.type = "date"
        dateTo.id = "dateTo"
        renderContent.append(dateTo)

        //dropdown for kontrakter
        const contracts = document.createElement("select")
        contracts.id = "contractPicker"
        contracts.appendChild(new Option("--Vælg--"));
        contracts.appendChild(new Option("contract 1"));
        contracts.appendChild(new Option("contract 2"));
        renderContent.append(contracts)
    }
    else if(resDropdown.value == "Greenfee"){
        //Dato og tid via datetimepicker
        const date = document.createElement("input")
        date.type = "datetime-local"
        date.id = "dateTime"
        renderContent.append(date)

        //dropdown for kontrakter
        const contracts = document.createElement("select")
        contracts.id = "contractPicker"
        contracts.appendChild(new Option("--Vælg--"));
        contracts.appendChild(new Option("contract 1"));
        contracts.appendChild(new Option("contract 2"));
        renderContent.append(contracts)
    }
    else{}
}