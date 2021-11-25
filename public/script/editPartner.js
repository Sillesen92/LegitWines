const companyName = () => document.querySelector("#companyName").value
const companyAddress = () => document.querySelector("#companyAddress").value
const companyEmail = () => document.querySelector("#companyEmail").value
const companyPhone = () => document.querySelector("#companyPhone").value
const companyType = () => document.querySelector("#companyType").value
const message = document.querySelector("#message")

const todayString = () => {
    const today = new Date()
    return `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
}


var selected;
var selectedContract;
const contracts = []

document.querySelector("#updatePartner").onclick = async (event) => {
    try {
        const companyId = document.querySelector(".partner").id
        const response = await fetch("/editPartner/" + companyId, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({ companyName: companyName(), companyAddress: companyAddress(), companyEmail: companyEmail(), companyPhone: companyPhone(), contracts: contracts })
        })
        if (response.ok) {
            message.innerHTML = "Samarbejdspartneren er opdateret."
        } else {
            message.innerHTML = "Fejl i opdateringen af en samarbejdspartner"
        }
    } catch (error) {
        error.textContent = error
    }
}

/*------------ Contract handling ------------*/
const contractDesc = () => document.querySelector("#contractDesc").value
const contractStart = () => document.querySelector("#contractStart").value
const contractEnd = () => document.querySelector("#contractEnd").value
const contractPrice = () => document.querySelector("#contractPrice").value
const contractList = document.querySelector("#contracts")

for (const div of document.getElementsByClassName("contractItem")) {
    const strArray = div.id.split("_")
    const contract = {
        description: strArray[0],
        startDate: strArray[1],
        endDate: strArray[2],
        netPrice: strArray[3]
    }
    contracts.push(contract)
    div.onclick = () => {
        updateSelectedContract(div, contract)
    }
}
document.querySelector("#deleteContract").onclick = removeContract
document.querySelector("#addContract").onclick = addContract
document.querySelector("#contractStart").value = todayString()
document.querySelector("#contractEnd").value = todayString()

function addContract() {
    const contract = {
        description: contractDesc(),
        startDate: contractStart(),
        endDate: contractEnd(),
        netPrice: contractPrice()
    }
    contracts.push(contract)
    var div = document.createElement("DIV")
    div.className = "contractItem"
    div.id = `${contract.description}_${contract.startDate}_${contract.endDate}_${contract.netPrice}`
    div.innerHTML = `<p>${contract.description}\n${contract.startDate} - ${contract.endDate}\n${contract.netPrice}kr.`
    div.onclick = () => updateSelectedContract(div, contract)
    contractList.appendChild(div)


    document.querySelector("#contractDesc").value = ""
    document.querySelector("#contractPrice").value = ""


    console.log(contract)

}

function removeContract() {
    console.log(selectedContract)
    for (let i = 0; i < contracts.length; i++) {
        const element = contracts[i];
        if (selectedContract == element) {
            contracts.splice(i,1)
            contractList.removeChild(selected)
        }
    }
    console.log(contracts)
}

function updateSelectedContract(div, contract) {
    if (selected != null) selected.classList.remove('selected')
    div.classList.add('selected')
    selected = div;
    selectedContract = contract
}