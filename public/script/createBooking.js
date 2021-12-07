const button = document.querySelector('.addReservationButton');
const modal = document.querySelector("#resModal")
const modalContent = document.querySelector(".resModalContent")
const renderContent = document.querySelector(".renderContent")
const span = document.querySelector(".closeResModal");
const resDropdown = document.querySelector("#reservationType")
let publicContracts = []
let chosenContracts = []
let selectedCompany;
let documents = [];
let divIdIndexContract = 1
let fromdate;
let todate;

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
    console.log(input);
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

function addContract(id) {
    let i = id.split('-')
    console.log(parseInt(i))
    const contract = publicContracts[parseInt(i[1])]
    console.log(contract)
    chosenContracts.push(contract)
    const divChosenContracts = document.querySelector("#chosenContracts")
    var div = document.createElement("div")
    div.className = "contractItem"
    div.id = `${contract.description}_${contract.startDate}_${contract.endDate}_${contract.netPrice}-${divIdIndexContract}`
    div.innerHTML = `<p>${contract.description}\n${contract.startDate} - ${contract.endDate}\n${contract.netPrice}kr.`
    div.onclick = () => removeContract(div, contract)
    divChosenContracts.appendChild(div)
    console.log(chosenContracts)
}

function removeContract(div, contract) {
    console.log(contract)
    const parentDiv = document.querySelector("#chosenContracts")
    const divIndex = Array.prototype.indexOf.call(parentDiv.children, div)
    chosenContracts.splice(divIndex - 1, 1);
    parentDiv.removeChild(div);
    console.log(chosenContracts)
}

function addDocument(documentType, data) {
    const documentList = document.querySelector("#createbooking")
    var doc;
    var div = document.createElement("DIV");
    div.className = "resCard"

    //TODO: Fix duplicate kode?
    if (documentType == "Hotel") {
        doc = {
            type: "Hotel",
            data: data
        }
        const content = document.createElement("DIV")
        const title = document.createElement("P")
        title.innerHTML = `Hotel - ${data.companyName}`
        const body = document.createElement("P")
        body.innerHTML = `${data.checkinDate.toLocaleDateString("da-DK")} - ${data.checkoutDate.toLocaleDateString("da-DK")}`
        content.append(title);
        content.append(body);
        content.className = "resCardContent";
        div.append(content);
    }
    else if (documentType == "Transfer") { }
    else if (documentType == "Billeje") { }
    else if (documentType == "Greenfee") {
        doc = {
            type: "Greenfee",
            data: data
        }
        const content = document.createElement("DIV")
        const title = document.createElement("P")
        title.innerHTML = `Greenfee - ${data.companyName}`
        const body = document.createElement("P")
        body.innerHTML = `${data.date.toLocaleDateString("da-DK")}`
        content.append(title);
        content.append(body);
        content.className = "resCardContent";
        div.append(content);

    }
    else if (documentType == "Passager") { }
    else if (documentType == "Flyafgang") { }

    const button = document.createElement("BUTTON")
    button.className = "removeReservationButton";
    button.innerHTML = "-"
    div.append(button)

    documents.push(doc);
    documentList.insertBefore(div, documentList.childNodes[documentList.childNodes.length - 2]);
    button.onclick = () => removeReservation(div, doc);
}

function removeReservation(div, doc) {
    console.log(div)
    console.log(doc)
    const documentList = document.querySelector("#createbooking")
    documents.splice(documents.indexOf(doc, 0), 1)
    documentList.removeChild(div);

}

//viser nødvendige informationer for opret hotel
async function renderModal() {
    try {
        renderContent.innerHTML = ""
        if (resDropdown.value == "Hotel") {
            renderHotels();
        }
        else if (resDropdown.value == "BoardingPass") {
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

        } else if (resDropdown.value == "Flyafgang") {
            renderFlights();
        } else if (resDropdown.value == "Transfer") {
            renderTransfers();
        } else if (resDropdown.value == "Billeje") {
            renderCarRentals();
        } else if (resDropdown.value == "Greenfee") {
            renderCourses();
        }
        else { }
    } catch {

    }
}

async function renderHotels() {
    //Render hotel partner side
    renderCompanyDropDown("hotel")
    const dateIn = renderDatePicker("Check-in dato", "dateIn", updateShownContracts)
    const dateOut = renderDatePicker("Check-ud dato", "dateOut", updateShownContracts)
    const commentInput = renderTextInput("Kommentar", "commentInput", null)
    renderContractPicker();

    //Bekræft-knap funktionalitet
    const button = document.querySelector("#confirmResButton")
    button.onclick = () => {
        const doc = {
            companyName: selectedCompany.companyName,
            checkinDate: dateIn.valueAsDate,
            checkoutDate: dateOut.valueAsDate,
            comment: commentInput.value,
            contracts: chosenContracts
        }
        addDocument("Hotel", doc)
    }

}

//TODO: fix
async function renderFlights() {
    renderCompanyDropDown("Flyafgang")

    //dropdown til tur derned eller retur
    const turRetur = document.createElement("select")
    turRetur.id = "turReturPicker"
    turRetur.appendChild(new Option("tur"))
    turRetur.appendChild(new Option("Retur"))
    renderContent.append(turRetur)

    const date = renderDatePicker("Dato", "date", updateShownContracts)

    //dropdown til all flyafgange
    const flights = document.createElement("select")
    flights.id = "flightPicker"
    flights.appendChild(new Option("fly1"))
    renderContent.append(flights)

    renderContractPicker();

    //TODO: Bekræft-knap funktionalitet
    const button = document.querySelector("#confirmResButton")
    button.onclick = () => {
        const doc = {

        }
        addDocument("Flyafgang", doc)
    }

}
async function renderTransfers() {
    renderCompanyDropDown("Transfer")
    const date = renderDatePicker("Dato", "date", updateShownContracts)
    const destination = renderTextInput("Destination", "destination", null)
    renderContractPicker();

    //TODO: Bekræft-knap funktionalitet
    const button = document.querySelector("#confirmResButton")
    button.onclick = () => {
        const doc = {

        }
        addDocument("Transfer", doc)
    }
}
//TODO: fix
async function renderCarRentals() {
    renderCompanyDropDown("Billeje")
    const dateIn = renderDatePicker("Fra-dato", "dateIn", updateShownContracts)
    const dateOut = renderDatePicker("Til-dato", "dateOut", updateShownContracts)
    renderContractPicker();

    //TODO: Bekræft-knap funktionalitet
    const button = document.querySelector("#confirmResButton")
    button.onclick = () => {
        const doc = {

        }
        addDocument("Billeje", doc)
    }
}

async function renderCourses() {
    //Render greenfee partner side
    renderCompanyDropDown("Greenfee")
    const date = renderDatePicker("Dato", "dateIn", updateShownContracts)
    renderContractPicker()

    //Bekræft-knap funktionalitet
    const button = document.querySelector("#confirmResButton")
    button.onclick = () => {
        const doc = {
            companyName: selectedCompany.companyName,
            date: date.valueAsDate,
            contracts: chosenContracts
        }
        addDocument("Greenfee", doc)
    }
}



//On-change funktion til at opdatere viste kontrakter
function updateShownContracts() {
    let startDate = null;
    let endDate = null;
    if (document.querySelector("#dateIn")) startDate = document.querySelector("#dateIn").valueAsDate
    if (document.querySelector("#dateOut")) endDate = document.querySelector("#dateOut").valueAsDate
    document.querySelector("#contractPicker").innerHTML = ""

    publicContracts.forEach(contract => {
        let valid = true
        let contractStart = new Date(contract.startDate);
        let contractEnd = new Date(contract.endDate);
        //TODO: Logik?
        if (startDate != null) {
            if (contractStart < startDate) {
                valid = false
            }
        }
        if (endDate != null) {
            if (contractEnd < endDate) {
                valid = false;
            }
        }
        if (valid === true) {
            addContractToList(contract);
        }
    });

}

//Tilføj en given kontrakt til listen over viste kontrakter
function addContractToList(contract) {
    const contracts = document.querySelector("#contractPicker");
    let index = publicContracts.indexOf(contract)
    contracts.innerHTML += `<div onclick = addContract('contract-${index}') id = 'contract-${index}'>${contract.description} + ${contract.netPrice}kr.</option>`;
}


//Render liste til at vælge og vise valgte kontrakter
function renderContractPicker() {
    //div for kontrakter
    const contracts = document.createElement("div")
    const contractPicker = document.createElement("div")
    contractPicker.id = "contractPicker"
    const titleDiv = document.createElement('div')
    const title = document.createElement('p')
    title.innerHTML = "Kontrakter"
    titleDiv.append(title)
    contracts.appendChild(titleDiv)
    contracts.appendChild(contractPicker)
    renderContent.append(contracts)

    //div med valgte kontrakter
    const divChosenContracts = document.createElement('div')
    divChosenContracts.id = 'chosenContracts'
    const chosenTitleDiv = document.createElement('div')
    const chosenTitle = document.createElement('p')
    chosenTitle.innerHTML = 'Valgte kontrakter'
    chosenTitleDiv.append(chosenTitle)
    divChosenContracts.appendChild(chosenTitleDiv)
    renderContent.append(divChosenContracts)
}

//Render listen af firmaer i dropdown
async function renderCompanyDropDown(type) {
    const response = await fetch("/getCompanies", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify({ companyType: type })
    })
    if (response.ok) {
        const resp = await response.json();
        const dropdown = document.querySelector(".companyPickerDropdownContent")
        dropdown.innerHTML = ""

        //Søgefelt
        const search = document.createElement("INPUT");
        search.type = "text";
        search.placeholder = "Søg...";
        search.id = "companyInput";
        search.onkeyup = filterFunction;
        dropdown.appendChild(search);

        //Elementer
        resp.forEach(element => {
            const a = document.createElement("A")
            dropdown.appendChild(a)
            a.href = `#${element.companyName}`
            a.innerHTML = `${element.companyName}`
            a.onclick = () => {
                selectedCompany = element;
                publicContracts = []
                element.contracts.forEach(contract => {
                    publicContracts.push(contract)
                })
                updateShownContracts()
            }
        });
    }
}


//Render og returnér en datepicker
function renderDatePicker(title, id, onchange) {

    const container = document.createElement("DIV")
    container.className = "colDiv"
    const lblTitle = document.createElement("P")
    lblTitle.innerHTML = title
    const datepicker = document.createElement("input")
    datepicker.type = "date"
    datepicker.id = id
    datepicker.addEventListener("change", onchange)
    container.append(lblTitle)
    container.append(datepicker)
    renderContent.append(container)
    return datepicker;
}


//Render og returnér et textfelt
function renderTextInput(title, id, onchange) {
    const container = document.createElement("DIV")
    container.className = "colDiv"
    const lblTitle = document.createElement("P")
    lblTitle.innerHTML = title
    const textInput = document.createElement("Input")
    textInput.type = "text"
    textInput.id = id
    container.append(lblTitle)
    container.append(textInput)
    renderContent.append(container)
    return textInput;
}

//reset modalContent
function resetModal() {
    resDropdown.options[0].selected = true
    const dropdown = document.querySelector(".companyPickerDropdownContent")
    dropdown.innerHTML = ""
    renderContent.innerHTML = "<img src='images/greensoftlogo.png' alt='Greensoft Logo' id='greensoftlogo'>"
}