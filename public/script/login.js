const userName = () => document.querySelector("#loginName").value
const password = () => document.querySelector("#loginPassword").value
const error = document.querySelector("#error")

document.querySelector("#loginForm").onclick = async (event) => {
    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({name: userName(), password: password()})
        })
        if (response.ok) {
            window.location.href = "/"
        } else {
            error.textContent = "FAILED TO LOG IN"
        }
    } catch (error) {
        error.textContent = error
    }
}