var selected;

const contracts = []

for (const item of document.getElementsByClassName("contractItem")) {
    const strArray = item.id.split("_")
    const contract = {
        Name: strArray[0],
        StartDate: strArray[1],
        EndDate: strArray[2],
        Price: strArray[3]
    }
    contracts.push(contract)
    item.onclick = (event) => {
        if (selected != null) selected.classList.remove('selected')
        item.classList.add('selected')
        selected = item;
        console.log(contract)
    }
}

function removeContract() {
}




