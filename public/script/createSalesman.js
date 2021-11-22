const salesmanName = () => document.querySelector("#salesmanName").value
const salesmanEmail = () => document.querySelector("#salesmanEmail").value
const salesmanPhoneNr = () => document.querySelector("#salesmanPhoneNr").value
const salesmanSalesId = () => document.querySelector("#salesmanSalesId").value
const salesmanPassword = () => document.querySelector("#salesmanPassword").value

const message = document.querySelector("#message")

document.querySelector("#createSalesman").onclick = async (event) => {
    try {
        const response = await fetch("/createSalesman", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({salesmanName: salesmanName(), salesmanEmail: salesmanEmail(), salesmanPhoneNr: salesmanPhoneNr(), salesmanSalesId: salesmanSalesId(), salesmanPassword: salesmanPassword()})
        })
        if (response.ok) {
            window.location.href = "/createSalesman"
        } else {
            message.textContent = (await response.json()).error
        }
    } catch (error) {
        message.textContent = error
    }
}