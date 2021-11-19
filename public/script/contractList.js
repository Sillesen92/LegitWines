const contractDesc = () => document.querySelector("#contractDesc").value
const contractStart = () => document.querySelector("#contractStart").value
const contractEnd = () => document.querySelector("#contractEnd").value
const contractPrice = () => document.querySelector("#contractPrice").value
const contractList = document.querySelector("#contracts")
var selected;
var selectedContract;

const contracts = []

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
        updateSelected(div, contract)
    }
}
document.querySelector("#deleteContract").onclick = removeContract
document.querySelector("#addContract").onclick = addContract

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
    div.onclick = () => updateSelected(div, contract)
    contractList.appendChild(div)

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

function updateSelected(div, contract) {
    if (selected != null) selected.classList.remove('selected')
    div.classList.add('selected')
    selected = div;
    selectedContract = contract
}

function getContracts() {
    return contracts
}

module.exports = {getContracts}
