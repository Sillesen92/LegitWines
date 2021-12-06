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
    else if (documentType == "Transfer") {}
    else if (documentType == "Billeje") {}
    else if (documentType == "Greenfee") {}
    else if (documentType == "Passager") {}
    else if (documentType == "Flyafgang") {}

    const button = document.createElement("BUTTON")
    button.className = "removeReservationButton";
    button.innerHTML = "-"
    div.append(button)

    documents.push(doc);
    documentList.insertBefore(div, documentList.childNodes[documentList.childNodes.length-2]);
    button.onclick = () => removeReservation(div, doc);
}

function removeReservation(div, doc) {
    console.log(div)
    console.log(doc)
    const documentList = document.querySelector("#createbooking")
    documents.splice(documents.indexOf(doc,0),1)
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
        //lig hoteller ind i dropdown
        const response = await fetch("/getCompanies", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({ companyType: 'hotel' })
        })
        if (response.ok) {
            const resp = await response.json();
            document.querySelector(".companyPickerDropdownContent").innerHTML = ""
            resp.forEach(element => {
                const a = document.createElement("A")
                document.querySelector(".companyPickerDropdownContent").appendChild(a)
                a.href = `#${element.companyName}`
                a.innerHTML = `${element.companyName}`
                a.onclick = () => {
                    selectedCompany = element;
                    const contracts = document.querySelector("#contractPicker");
                    contracts.innerHTML = ""
                    let index = 0
                    publicContracts = []
                    element.contracts.forEach(contract => {
                        //check om contract er indenfor datoerne
                        publicContracts.push({
                            description: contract.description,
                            startDate: contract.startDate,
                            endDate: contract.endDate,
                            netPrice: contract.netPrice
                        })
                        console.log(contract)
                        contracts.innerHTML += `<div onclick = addContract('contract-${index}') id = 'contract-${index}'>${contract.description} + ${contract.netPrice}kr.</option>`;
                        index++
                    })
                }
            });
        }

        //datepicker indtjekningsdato
        const divDateIn = document.createElement("DIV")
        divDateIn.className = "colDiv"
        const lblDateIn = document.createElement("P")
        lblDateIn.innerHTML = "Check-in dato"
        const dateIn = document.createElement("input")
        dateIn.type = "date"
        dateIn.id = "dateIn"
        divDateIn.append(lblDateIn)
        divDateIn.append(dateIn)
        renderContent.append(divDateIn)

        //datepicker udtjekningsdato
        const divDateOut = document.createElement("DIV")
        divDateOut.className = "colDiv"
        const lblDateOut = document.createElement("P")
        lblDateOut.innerHTML = "Check-ud dato"
        const dateOut = document.createElement("input")
        dateOut.type = "date"
        dateOut.id = "dateOut"
        divDateOut.append(lblDateOut)
        divDateOut.append(dateOut)
        renderContent.append(divDateOut)

/*             //dropdown for pension
        const pension = document.createElement("select")
        pension.id = "pensionPicker"
        pension.appendChild(new Option("Ingen"));
        pension.appendChild(new Option("Halv-Pension"));
        pension.appendChild(new Option("Hel-Pension"));
        renderContent.append(pension) */

        //kommentarfelt
        const divComment = document.createElement("DIV")
        divComment.className = "colDiv"
        const lblComment = document.createElement("P")
        lblComment.innerHTML = "Kommentar"
        const commentInput = document.createElement("Input")
        commentInput.type = "text"
        commentInput.id = "commentInput"
        divComment.append(lblComment)
        divComment.append(commentInput)
        renderContent.append(divComment)

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
        renderContent.append(divChosenContracts)
        const chosenTitleDiv = document.createElement('div')
        const chosenTitle = document.createElement('p')
        chosenTitle.innerHTML = 'Valgte kontrakter'
        chosenTitleDiv.append(chosenTitle)
        divChosenContracts.appendChild(chosenTitleDiv)

        //bekræft-knap funktionalitet
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


async function renderFlights() {
    //lig flyafgange ind i dropdown
    const response = await fetch("/getCompanies", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify({ companyType: 'Flyafgang' })
    })
    if (response.ok) {
        const resp = await response.json();
        document.querySelector(".companyPickerDropdownContent").innerHTML = ""
        resp.forEach(element => {
            const a = document.createElement("A")
            document.querySelector(".companyPickerDropdownContent").appendChild(a)
            a.href = `#${element.companyName}`
            a.innerHTML = `${element.companyName}`
            a.onclick = () => {
                const contracts = document.querySelector("#contractPicker");
                contracts.innerHTML = "<div> Kontrakter </div>"
                let index = 0
                publicContracts = []
                element.contracts.forEach(contract => {
                    //check om contract er indenfor datoerne
                    publicContracts.push({
                        description: contract.description,
                        startDate: contract.startDate,
                        endDate: contract.endDate,
                        netPrice: contract.netPrice
                    })
                    console.log(contract)
                    contracts.innerHTML += `<div onclick = addContract('contract-${index}') id = 'contract-${index}'>${contract.description} + ${contract.netPrice}kr.</option>`;
                    index++
                })
            }
        });
    }

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

    //div for kontrakter
    const contracts = document.createElement("div")
    contracts.id = "contractPicker"
    renderContent.append(contracts)
    const title = document.createElement('div')
    title.innerHTML = "Kontrakter"
    contracts.appendChild(title)

    //div med valgte kontrakter
    const divChosenContracts = document.createElement('div')
    divChosenContracts.id = 'chosenContracts'
    renderContent.append(divChosenContracts)
    const chosenTitle = document.createElement('div')
    chosenTitle.innerHTML = 'Valgte kontrakter'
    divChosenContracts.appendChild(chosenTitle)

}

async function renderTransfers() {
        //lig transfer ind i dropdown
        const response = await fetch("/getCompanies", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({ companyType: 'Transfer' })
        })
        if (response.ok) {
            const resp = await response.json();
            document.querySelector(".companyPickerDropdownContent").innerHTML = ""
            resp.forEach(element => {
                const a = document.createElement("A")
                document.querySelector(".companyPickerDropdownContent").appendChild(a)
                a.href = `#${element.companyName}`
                a.innerHTML = `${element.companyName}`
                a.onclick = () => {
                    const contracts = document.querySelector("#contractPicker");
                    contracts.innerHTML = "<div> Kontrakter </div>"
                    let index = 0
                    publicContracts = []
                    element.contracts.forEach(contract => {
                        //check om contract er indenfor datoerne
                        publicContracts.push({
                            description: contract.description,
                            startDate: contract.startDate,
                            endDate: contract.endDate,
                            netPrice: contract.netPrice
                        })
                        console.log(contract)
                        contracts.innerHTML += `<div onclick = addContract('contract-${index}') id = 'contract-${index}'>${contract.description} + ${contract.netPrice}kr.</option>`;
                        index++
                    })
                }
            });
        }
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

        //div for kontrakter
        const contracts = document.createElement("div")
        contracts.id = "contractPicker"
        renderContent.append(contracts)
        const title = document.createElement('div')
        title.innerHTML = "Kontrakter"
        contracts.appendChild(title)

        //div med valgte kontrakter
        const divChosenContracts = document.createElement('div')
        divChosenContracts.id = 'chosenContracts'
        renderContent.append(divChosenContracts)
        const chosenTitle = document.createElement('div')
        chosenTitle.innerHTML = 'Valgte kontrakter'
        divChosenContracts.appendChild(chosenTitle)
}

async function renderCarRentals() {
        //lig billejer ind i dropdown
        const response = await fetch("/getCompanies", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({ companyType: 'Billeje' })
        })
        if (response.ok) {
            const resp = await response.json();
            document.querySelector(".companyPickerDropdownContent").innerHTML = ""
            resp.forEach(element => {
                const a = document.createElement("A")
                document.querySelector(".companyPickerDropdownContent").appendChild(a)
                a.href = `#${element.companyName}`
                a.innerHTML = `${element.companyName}`
                a.onclick = () => {
                    const contracts = document.querySelector("#contractPicker");
                    contracts.innerHTML = "<div> Kontrakter </div>"
                    let index = 0
                    publicContracts = []
                    element.contracts.forEach(contract => {
                        //check om contract er indenfor datoerne
                        publicContracts.push({
                            description: contract.description,
                            startDate: contract.startDate,
                            endDate: contract.endDate,
                            netPrice: contract.netPrice
                        })
                        console.log(contract)
                        contracts.innerHTML += `<div onclick = addContract('contract-${index}') id = 'contract-${index}'>${contract.description} + ${contract.netPrice}kr.</option>`;
                        index++
                    })
                }
            });
        }
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

        //div for kontrakter
        const contracts = document.createElement("div")
        contracts.id = "contractPicker"
        renderContent.append(contracts)
        const title = document.createElement('div')
        title.innerHTML = "Kontrakter"
        contracts.appendChild(title)

        //div med valgte kontrakter
        const divChosenContracts = document.createElement('div')
        divChosenContracts.id = 'chosenContracts'
        renderContent.append(divChosenContracts)
        const chosenTitle = document.createElement('div')
        chosenTitle.innerHTML = 'Valgte kontrakter'
        divChosenContracts.appendChild(chosenTitle)
}

async function renderCourses() {
        //lig transfer ind i dropdown
        const response = await fetch("/getCompanies", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({ companyType: 'Greenfee' })
        })
        if (response.ok) {
            const resp = await response.json();
            document.querySelector(".companyPickerDropdownContent").innerHTML = ""
            resp.forEach(element => {
                const a = document.createElement("A")
                document.querySelector(".companyPickerDropdownContent").appendChild(a)
                a.href = `#${element.companyName}`
                a.innerHTML = `${element.companyName}`
                a.onclick = () => {
                    const contracts = document.querySelector("#contractPicker");
                    contracts.innerHTML = "<div> Kontrakter </div>"
                    let index = 0
                    publicContracts = []
                    element.contracts.forEach(contract => {
                        //check om contract er indenfor datoerne
                        publicContracts.push({
                            description: contract.description,
                            startDate: contract.startDate,
                            endDate: contract.endDate,
                            netPrice: contract.netPrice
                        })
                        console.log(contract)
                        contracts.innerHTML += `<div onclick = addContract('contract-${index}') id = 'contract-${index}'>${contract.description} + ${contract.netPrice}kr.</option>`;
                        index++
                    })
                }
            });
        }
        //Dato og tid via datetimepicker
        const date = document.createElement("input")
        date.type = "datetime-local"
        date.id = "dateTime"
        renderContent.append(date)

        //div for kontrakter
        const contracts = document.createElement("div")
        contracts.id = "contractPicker"
        renderContent.append(contracts)
        const title = document.createElement('div')
        title.innerHTML = "Kontrakter"
        contracts.appendChild(title)

        //div med valgte kontrakter
        const chosenContracts = document.createElement('div')
        chosenContracts.id = 'chosenContracts'
        renderContent.append(chosenContracts)
        const chosenTitle = document.createElement('div')
        chosenTitle.innerHTML = 'Valgte kontrakter'
        chosenContracts.appendChild(chosenTitle)
}