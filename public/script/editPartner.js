const companyId = () => document.getElementsByClassName("Partner")[0].id
const companyName = () => document.querySelector("#companyName").value
const companyAddress = () => document.querySelector("#companyAddress").value
const companyEmail = () => document.querySelector("#companyEmail").value
const companyPhone = () => document.querySelector("#companyPhone").value
const companyType = () => document.querySelector("#companyType").value
const error = document.querySelector("#error")

document.querySelector("#updatePartner").onclick = async (event) => {
    try {
        const response = await fetch("/editPartner/" + companyId, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({ companyName: companyName(), companyAddress: companyAddress(), companyEmail: companyEmail(), companyPhone: companyPhone() })
        })
        if (response.ok) {
            window.location.href = "/editPartner"
        } else {
            error.textContent = "Fejl der er fejl i redigeringen af en partner"
        }
    } catch (error) {
        error.textContent = error
    }
}