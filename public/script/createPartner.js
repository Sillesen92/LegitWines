const companyName = () => document.querySelector("#companyName").value
const companyAddress = () => document.querySelector("#companyAddress").value
const companyEmail = () => document.querySelector("#companyEmail").value
const companyPhone = () => document.querySelector("#companyPhone").value
const companyType = () => document.querySelector("#companyType").value
const message = document.querySelector("#message")

document.querySelector("#createPartner").onclick = async (event) => {
    try {
        const response = await fetch("/createPartner", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({companyName: companyName(), companyAddress: companyAddress(), companyEmail: companyEmail(), companyPhone: companyPhone(), companyType: companyType()})
        })
        if (response.ok) {
            window.location.href = "/createPartner"
        } else {
            message.textContent = (await response.json()).error
        }
    } catch (error) {
        message.textContent = error
    }
}
