const userName = () => document.querySelector("#loginName").value
const password = () => document.querySelector("#loginPassword").value
const error = document.querySelector("#error")


document.querySelector("#loginPassword").addEventListener("keyup", function(event) {
    console.log(event.keyCode);
    if(event.keyCode === 13) {
        event.preventDefault();
        login();
    }
})

document.querySelector("#loginForm").onclick = async (event) => {
    login();
}

async function login() {
try {
    const response = await fetch("/login", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify({ name: userName(), password: password() })
    })
    if (response.ok) {
        window.location.href = "/createbooking"
    } else {
        error.textContent = "FAILED TO LOG IN"
    }
} catch (error) {
    error.textContent = error
}}