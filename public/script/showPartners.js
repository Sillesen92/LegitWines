const companyType = () => document.querySelector("#companyType").value
const partnerTable = document.querySelector("#partnerTable")

document.querySelector("#getPartners").onclick = async (event) => {
    console.log(partnerTable.rows.length)
    while (partnerTable.rows.length > 1) {
        partnerTable.deleteRow(1)
    }
    try {
        const response = await fetch("/editPartner", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({ companyType: companyType() })
        })
        if (response.ok) {
            /*Render table*/
            const companies = await response.json();
            console.log(companies)
            companies.forEach(element => {
                var row = partnerTable.insertRow();
                var cellName = row.insertCell();
                cellName.innerHTML = element.companyName;
                var cellAdress = row.insertCell();
                cellAdress.innerHTML = element.companyAddress;
                var cellEmail = row.insertCell();
                cellEmail.innerHTML = element.companyEmail;
                var cellPhone = row.insertCell();
                cellPhone.innerHTML = "+" + element.companyPhone;
                row.onclick = (event) => location.href = `/editPartner/${element.companyId}`
            });

        } else {
            error.textContent = "Fejl i oprettelse af samarbejdspartner"
        }
    } catch (error) {
        error.textContent = error
    }
}
